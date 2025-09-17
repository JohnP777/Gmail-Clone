"use client";

import Image from "next/image";

export default function Promotion() {
  return (
    <button
      type="button"
      aria-label="Promotions"
      className="inline-flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-gray-900 w-[180px] justify-start"
    >
      <Image src="/Promotions.PNG" alt="Promotions" width={20} height={20} className="-ml-1" />
      <span className="text-sm">Promotions</span>
    </button>
  );
}


