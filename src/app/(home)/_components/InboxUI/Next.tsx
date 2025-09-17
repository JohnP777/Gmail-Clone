"use client";

import Image from "next/image";

export default function Next() {
  return (
    <button
      type="button"
      aria-label="Next"
      className="rounded-full p-2 hover:bg-gray-200/70 active:bg-gray-300 transition"
    >
      <Image src="/Right.PNG" alt="Next" width={10} height={10} />
    </button>
  );
}


