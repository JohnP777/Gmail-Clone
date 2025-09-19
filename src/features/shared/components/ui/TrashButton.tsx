"use client";

import Image from "next/image";

export default function TrashButton() {
  return (
    <button
      type="button"
      aria-label="Trash"
      className="flex items-center gap-4 h-8 w-62 rounded-2xl bg-[#f9fafd] hover:bg-gray-200/70 text-black px-9 py-3 cursor-pointer"
    >
      <Image src="/Delete.PNG" alt="Trash" width={14} height={14} />
      <span className="text-[14px]">Trash</span>
    </button>
  );
}


