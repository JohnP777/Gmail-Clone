"use client";

import Image from "next/image";

export default function ComposeButton() {
  return (
    <button
      type="button"
      aria-label="Compose"
      className="flex items-center gap-3 rounded-2xl bg-[#cfeeff] hover:bg-[#bfe5ff] active:bg-[#a7dbff] text-black px-5 py-3 shadow-sm transition"
    >
      <Image src="/Compose.PNG" alt="Compose" width={20} height={20} />
      <span className="font-medium">Compose</span>
    </button>
  );
}


