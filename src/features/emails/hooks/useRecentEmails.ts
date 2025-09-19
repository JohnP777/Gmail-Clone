import { useQuery } from "@tanstack/react-query";

export type RecentEmail = {
  id: string;
  threadId: string | null;
  snippet: string;
  internalDate: string | null;
  timeSent: string | null;
  from: string | null;
  to: string | null;
  subject: string | null;
  date: string | null;
  labelIds: string[];
};

async function fetchRecentEmails(): Promise<RecentEmail[]> {
  const res = await fetch("/api/gmail/recent", { credentials: "include" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch emails");
  }
  const data = (await res.json()) as { messages: RecentEmail[] };
  return data.messages;
}

export function useRecentEmails() {
  return useQuery({
    queryKey: ["gmail", "recent"],
    queryFn: fetchRecentEmails,
    staleTime: 60_000,
  });
}


