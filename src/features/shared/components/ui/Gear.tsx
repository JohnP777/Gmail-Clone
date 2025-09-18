"use client";

import Image from "next/image";

export default function Gear() {
  return (
    <button
      type="button"
      aria-label="Settings"
      className="rounded-full p-2 hover:bg-gray-200/70 active:bg-gray-300 transition cursor-pointer"
    >
      <Image src="/Gear.PNG" alt="Settings" width={20} height={20} />
    </button>
  );
}



