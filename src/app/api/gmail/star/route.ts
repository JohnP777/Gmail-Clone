import { NextResponse } from "next/server";
import { google } from "googleapis";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { env } from "~/env";

async function getOAuthClientForUser(userId: string) {
  const account = await db.account.findFirst({
    where: { userId, provider: "google" },
  });
  if (!account?.access_token) return null;

  // Pass clientId + clientSecret so refresh works
  const oauth2 = new google.auth.OAuth2(
    env.AUTH_GOOGLE_ID,
    env.AUTH_GOOGLE_SECRET,
    // Redirect URI not strictly required to refresh, but safe to keep
    "http://localhost:3000/api/auth/callback/google"
  );

  oauth2.setCredentials({
    access_token: account.access_token ?? undefined,
    refresh_token: account.refresh_token ?? undefined,
    expiry_date: account.expires_at ? account.expires_at * 1000 : undefined,
  });

  // If token is close to expiring AND we have a refresh token, refresh now
  const exp = account.expires_at ? account.expires_at * 1000 : 0;
  const needsRefresh = !account.access_token || !exp || Date.now() > exp - 30_000;

  if (needsRefresh && account.refresh_token) {
    try {
      const { credentials } = await oauth2.refreshAccessToken(); // returns { access_token, expiry_date, refresh_token? }
      // persist new credentials
      await db.account.update({
        where: {
          provider_providerAccountId: {
            provider: "google",
            providerAccountId: account.providerAccountId,
          },
        },
        data: {
          access_token: credentials.access_token ?? account.access_token,
          refresh_token: credentials.refresh_token ?? account.refresh_token,
          expires_at: credentials.expiry_date
            ? Math.floor(credentials.expiry_date / 1000)
            : account.expires_at ?? undefined,
        },
      });
      oauth2.setCredentials(credentials);
    } catch (e: any) {
      const errMsg = e?.response?.data?.error || e?.message || "";
      if (/invalid_grant/i.test(String(errMsg))) {
        await db.account.update({
          where: {
            provider_providerAccountId: {
              provider: "google",
              providerAccountId: account.providerAccountId,
            },
          },
          data: { access_token: null, refresh_token: null, expires_at: null },
        });
        throw new Error("RELINK_GOOGLE");
      }
      throw e;
    }
  }

  return oauth2;
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { emailId } = body;

    if (!emailId) {
      return new NextResponse("Email ID is required", { status: 400 });
    }

    const oauth2 = await getOAuthClientForUser(session.user.id);
    if (!oauth2) {
      return new NextResponse("Google account not linked", { status: 400 });
    }

    const client = oauth2; // non-null after guard above
    const gmail = google.gmail({ version: "v1", auth: client });

    async function starWithRetry() {
      try {
        return await gmail.users.messages.modify({
          userId: "me",
          id: emailId,
          requestBody: {
            addLabelIds: ["STARRED"],
          },
        });
      } catch (e: any) {
        const status = e?.response?.status || e?.status;
        const msg = e?.response?.data?.error || e?.message || "";
        const shouldRetry =
          (status === 401 || status === 403 || /invalid_token|insufficient/i.test(String(msg))) &&
          !!client.credentials.refresh_token;

        if (shouldRetry) {
          const { credentials } = await client.refreshAccessToken();
          client.setCredentials(credentials);
          // optionally persist credentials here
          return await gmail.users.messages.modify({
            userId: "me",
            id: emailId,
            requestBody: {
              addLabelIds: ["STARRED"],
            },
          });
        }
        throw e;
      }
    }

    await starWithRetry();

    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err?.message === "RELINK_GOOGLE") {
      return new NextResponse("Google access expired. Please re-connect Google.", { status: 409 });
    }
    const msg = err?.response?.data?.error?.message || err?.message || "Failed to star email";
    const status = err?.response?.status || err?.status || 500;
    return new NextResponse(msg, { status });
  }
}
