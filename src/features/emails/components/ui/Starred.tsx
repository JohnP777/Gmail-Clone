"use client";

interface StarredProps {
  isStarred: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Starred({ isStarred, onClick, className = "" }: StarredProps) {
  return (
    <button
      onClick={onClick}
      className={`p-1 hover:bg-gray-200 rounded transition-colors ${className}`}
    >
      <svg
        className={`w-4 h-4 ${
          isStarred ? 'text-yellow-400 fill-current' : 'text-gray-400'
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
  );
}
