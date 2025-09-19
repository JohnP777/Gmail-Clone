"use client";

import { useMemo, useState } from "react";
import { useRecentEmails } from "~/features/emails/hooks/useRecentEmails";
import { formatEmailDate } from "~/features/emails/components/helpers/formatEmailDate";
import { decodeHtmlEntitiesSafe } from "~/lib/html-utils";
import DeleteButton from "~/features/emails/components/ui/DeleteButton";

function extractSenderName(from: string | null): string {
  if (!from) return "Unknown";
  const match = from.match(/^\s*"?([^"<]+)"?\s*<.*>$/);
  if (match && match[1]) return match[1].trim();
  return from;
}

export default function RecentEmailsList() {
  const { data, isLoading, error } = useRecentEmails();
  const [starredEmails, setStarredEmails] = useState<Set<string>>(new Set());
  const [hoveredEmailId, setHoveredEmailId] = useState<string | null>(null);

  const items = useMemo(() => (data ?? []).slice(0, 15), [data]);

  const toggleStar = (emailId: string) => {
    setStarredEmails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(emailId)) {
        newSet.delete(emailId);
      } else {
        newSet.add(emailId);
      }
      return newSet;
    });
  };

  const handleDelete = (emailId: string) => {
    // TODO: Implement delete functionality
    console.log("Delete email:", emailId);
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
              <button
                onClick={() => toggleStar(m.id)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <svg
                  className={`w-4 h-4 ${
                    starredEmails.has(m.id) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              </button>
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


