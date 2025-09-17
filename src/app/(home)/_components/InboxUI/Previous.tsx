"use client";

import Image from "next/image";

export default function Previous() {
  return (
    <button
      type="button"
      aria-label="Previous"
      className="rounded-full p-2 hover:bg-gray-200/70 active:bg-gray-300 transition"
    >
      <Image src="/Left.PNG" alt="Previous" width={10} height={10} />
    </button>
  );
}


