"use client";

import Image from "next/image";

export default function KeepButton() {
  return (
    <button
      type="button"
      aria-label="Keep"
      className="rounded-full ml-1 hover:bg-gray-200/70 active:bg-gray-300 transition cursor-pointer"
    >
      <Image src="/Keep.PNG" alt="Keep" width={28} height={28} />
    </button>
  );
}



