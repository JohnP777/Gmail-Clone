"use client";

import Image from "next/image";

export default function RefreshButton() {
  return (
    <button
      type="button"
      aria-label="Refresh"
      className="rounded-full p-2 hover:bg-gray-200/70 active:bg-gray-300 transition"
    >
      <Image src="/Refresh.PNG" alt="Refresh" width={20} height={20} />
    </button>
  );
}


