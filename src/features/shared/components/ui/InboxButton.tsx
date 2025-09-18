"use client";

import Image from "next/image";

export default function InboxButton() {
  return (
    <button
      type="button"
      aria-label="Inbox"
      className="flex items-center gap-4 h-8 w-62 rounded-2xl bg-[#cfeeff] hover:bg-[#bfe5ff] active:bg-[#a7dbff] text-black px-9 py-3 shadow-sm transition cursor-pointer"
    >
      <Image src="/Primary.PNG" alt="Compose" width={16} height={16} />
      <span className="font-semibold text-[14px]">Inbox</span>
    </button>
  );
}


