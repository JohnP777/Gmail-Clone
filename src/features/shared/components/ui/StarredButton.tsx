"use client";

import Image from "next/image";

export default function InboxButton() {
  return (
    <button
      type="button"
      aria-label="Starred"
      className="flex items-center gap-4 h-8 w-62 rounded-2xl bg-[#f9fafd] hover:bg-gray-200/70 text-black px-9 py-3 cursor-pointer"
    >
      <Image src="/Starred.PNG" alt="Starred" width={14} height={14} />
      <span className="text-[14px]">Starred</span>
    </button>
  );
}


