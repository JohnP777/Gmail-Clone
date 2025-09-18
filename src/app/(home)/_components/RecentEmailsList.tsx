"use client";

import { useMemo } from "react";
import { useRecentEmails } from "~/features/emails/hooks/useRecentEmails";

function extractSenderName(from: string | null): string {
  if (!from) return "Unknown";
  const match = from.match(/^\s*"?([^"<]+)"?\s*<.*>$/);
  if (match && match[1]) return match[1].trim();
  return from;
}

export default function RecentEmailsList() {
  const { data, isLoading, error } = useRecentEmails();

  const items = useMemo(() => (data ?? []).slice(0, 15), [data]);


  const MAX_SNIPPET_CHARS = 80;

  const truncate = (text: string, max: number) => {
    if (!text) return "";
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
  };

  if (isLoading) {
    return <div className="px-4 py-3 text-sm text-gray-500">Loading recent emails…</div>;
  }
  if (error) {
    return (
      <div className="px-4 py-3 text-sm text-red-600">
        {(error as Error).message || "Failed to load emails"}
      </div>
    );
  }
  if (!items.length) {
    return <div className="px-4 py-3 text-sm text-gray-500">No recent emails</div>;
  }

  return (
    <ul className="divide-y divide-gray-100">
      {items.map((m) => (
        <li key={m.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[13px] text-gray-800 overflow-hidden">
                <span className="truncate shrink-0 max-w-[25%]">
                  {extractSenderName(m.from)}
                </span>
                <span className="truncate shrink-0 max-w-[40%]">
                  {m.subject ?? "(no subject)"}
                </span>
                <span className="text-gray-500 truncate flex-1">
                  - {truncate(m.snippet, MAX_SNIPPET_CHARS)}
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}


