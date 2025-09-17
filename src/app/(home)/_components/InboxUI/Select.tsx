"use client";

import Image from "next/image";

export default function RefreshButton() {
  return (
    <button
      type="button"
      aria-label="Select"
      className="rounded-full p-2 hover:bg-gray-200/70 active:bg-gray-300 transition"
    >
      <Image src="/Down.PNG" alt="Select" width={10} height={10} />
    </button>
  );
}


