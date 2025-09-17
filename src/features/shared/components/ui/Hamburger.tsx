"use client";

import Image from "next/image";

export default function Hamburger() {
  return (
    <button
      type="button"
      aria-label="Open navigation menu"
      className="rounded-full p-2 hover:bg-gray-200/70 active:bg-gray-300 transition"
    >
      <Image src="/Hamburger.PNG" alt="Menu" width={20} height={20} />
    </button>
  );
}



