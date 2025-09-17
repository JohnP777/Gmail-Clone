"use client";

import Image from "next/image";

export default function Primary() {
  return (
    <button
      type="button"
      aria-label="Primary"
      className="inline-flex items-center gap-2 px-4 py-3 text-blue-600 border-b-4 border-blue-600 font-medium w-[180px] justify-start"
    >
      <Image src="/Primary.PNG" alt="Primary" width={20} height={20} className="-ml-1" />
      <span className="text-sm">Primary</span>
    </button>
  );
}


