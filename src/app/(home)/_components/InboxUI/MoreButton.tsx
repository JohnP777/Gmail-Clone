"use client";

import Image from "next/image";

export default function MoreButton() {
  return (
    <button
      type="button"
      aria-label="More options"
      className="rounded-full p-2 hover:bg-gray-200/70 active:bg-gray-300 transition"
    >
      <Image src="/TripleDot.PNG" alt="More" width={20} height={20} />
    </button>
  );
}


