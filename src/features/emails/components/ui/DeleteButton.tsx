"use client";

import Image from "next/image";

interface DeleteButtonProps {
  onClick?: () => void;
  className?: string;
}

export default function DeleteButton({ onClick, className = "" }: DeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Delete email"
      className={`p-1 hover:bg-gray-200 rounded-full transition-colors ${className}`}
    >
      <Image 
        src="/Delete.PNG" 
        alt="Delete" 
        width={17} 
        height={17}
        className="opacity-70 hover:opacity-100 transition-opacity"
      />
    </button>
  );
}
