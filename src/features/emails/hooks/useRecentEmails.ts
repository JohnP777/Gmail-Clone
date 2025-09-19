import { useQuery } from "@tanstack/react-query";
import { useLabel } from "~/contexts/LabelContext";
import { Label } from "~/types/label";

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

async function fetchRecentEmails(label: Label): Promise<RecentEmail[]> {
  const url = new URL("/api/gmail/recent", window.location.origin);
  url.searchParams.set("label", label);
  
  const res = await fetch(url.toString(), { credentials: "include" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch emails");
  }
  const data = (await res.json()) as { messages: RecentEmail[] };
  return data.messages;
}

export function useRecentEmails() {
  const { currentLabel } = useLabel();
  
  return useQuery({
    queryKey: ["gmail", "recent", currentLabel],
    queryFn: () => fetchRecentEmails(currentLabel),
    staleTime: 60_000,
  });
}


