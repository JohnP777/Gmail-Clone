import { useQuery } from "@tanstack/react-query";
import { useLabel } from "~/contexts/LabelContext";
import type { Label } from "~/types/label";
import type { Email } from "~/types/email";

async function fetchRecentEmails(label: Label): Promise<Email[]> {
  const url = new URL("/api/gmail/recent", window.location.origin);
  url.searchParams.set("label", label);
  
  const res = await fetch(url.toString(), { credentials: "include" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch emails");
  }
  const data = (await res.json()) as { messages: Email[] };
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


