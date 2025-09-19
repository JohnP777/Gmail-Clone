"use client";

import { useMemo, useState } from "react";
import { useRecentEmails } from "~/features/emails/hooks/useRecentEmails";
import { useDeleteEmail } from "~/features/emails/hooks/useDeleteEmail";
import { useStarEmail } from "~/features/emails/hooks/useStarEmail";
import { useUnstarEmail } from "~/features/emails/hooks/useUnstarEmail";
import { formatEmailDate } from "~/features/emails/components/helpers/formatEmailDate";
import { decodeHtmlEntitiesSafe } from "~/lib/html-utils";
import DeleteButton from "~/features/emails/components/ui/DeleteButton";
import Starred from "~/features/emails/components/ui/Starred";

function extractSenderName(from: string | null): string {
  if (!from) return "Unknown";
  const match = /^\s*"?([^"<]+)"?\s*<.*>$/.exec(from);
  return match?.[1]?.trim() ?? from;
}

export default function RecentEmailsList() {
  const { data, isLoading, error } = useRecentEmails();
  const deleteEmailMutation = useDeleteEmail();
  const starEmailMutation = useStarEmail();
  const unstarEmailMutation = useUnstarEmail();
  const [hoveredEmailId, setHoveredEmailId] = useState<string | null>(null);

  const items = useMemo(() => (data ?? []).slice(0, 15), [data]);

  const toggleStar = (emailId: string, isCurrentlyStarred: boolean) => {
    if (isCurrentlyStarred) {
      unstarEmailMutation.mutate(emailId);
    } else {
      starEmailMutation.mutate(emailId);
    }
  };

  const handleDelete = (emailId: string) => {
    deleteEmailMutation.mutate(emailId);
  };


  const MAX_COMBINED_CHARS = 120; // Combined subject + message length

  const truncate = (text: string, max: number) => {
    if (!text) return "";
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
  };

  const formatSubjectAndSnippet = (subject: string | null, snippet: string) => {
    const subjectText = subject ?? "(no subject)";
    const decodedSnippet = decodeHtmlEntitiesSafe(snippet);
    const combined = `${subjectText} - ${decodedSnippet}`;
    return truncate(combined, MAX_COMBINED_CHARS);
  };

  if (isLoading) {
    return <div className="px-4 py-3 text-sm text-gray-500">Loading recent emails…</div>;
  }
  if (error) {
    return (
      <div className="px-4 py-3 text-sm text-red-600">
        {error instanceof Error ? error.message : "Failed to load emails"}
      </div>
    );
  }
  if (!items.length) {
    return <div className="px-4 py-3 text-sm text-gray-500">No recent emails</div>;
  }

  return (
    <ul className="divide-y divide-gray-100">
      {items.map((m) => (
        <li 
          key={m.id} 
          className="px-4 py-2 hover:bg-gray-50 transition-colors"
          onMouseEnter={() => setHoveredEmailId(m.id)}
          onMouseLeave={() => setHoveredEmailId(null)}
        >
          <div className="flex items-center gap-3 pl-2">
            {/* Checkbox, Star, Sender Name */}
            <div className="flex items-center gap-2 w-56 shrink-0">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Starred
                isStarred={m.labelIds.includes("STARRED")}
                onClick={() => toggleStar(m.id, m.labelIds.includes("STARRED"))}
              />
              <span className="text-[14px] text-gray-800 truncate">
                {extractSenderName(m.from)}
              </span>
            </div>

            {/* Subject + Message */}
            <div className="flex-1 min-w-0 px-4">
              <div className="text-[13.5px] text-gray-800 truncate">
                {formatSubjectAndSnippet(m.subject, m.snippet)}
              </div>
            </div>

            {/* Time or Delete Button */}
            <div className="shrink-0 -my-1">
              {hoveredEmailId === m.id ? (
                <DeleteButton onClick={() => handleDelete(m.id)} />
              ) : (
                <div className="text-[12px] text-black font-semibold">
                  {m.timeSent ? formatEmailDate(m.timeSent) : ""}
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}


