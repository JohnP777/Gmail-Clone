"use client";

import Image from "next/image";

export default function InboxButton() {
  return (
    <button
      type="button"
      aria-label="Drafts"
      className="flex items-center gap-4 h-8 w-62 rounded-2xl bg-[#f9fafd] hover:bg-gray-200/70 text-black px-9 py-3 cursor-pointer"
    >
      <Image src="/Drafts.PNG" alt="Drafts" width={14} height={14} />
      <span className="text-[14px]">Drafts</span>
    </button>
  );
}


