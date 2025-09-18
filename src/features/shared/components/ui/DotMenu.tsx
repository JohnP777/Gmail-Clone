"use client";

import Image from "next/image";

export default function DotMenu() {
  return (
    <button
      type="button"
      aria-label="More apps"
      className="rounded-full p-2 hover:bg-gray-200/70 active:bg-gray-300 transition cursor-pointer"
    >
      <Image src="/DotMenu.PNG" alt="Apps" width={16} height={16} />
    </button>
  );
}


