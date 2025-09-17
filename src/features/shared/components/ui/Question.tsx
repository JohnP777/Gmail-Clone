"use client";

import Image from "next/image";

export default function Question() {
  return (
    <button
      type="button"
      aria-label="Help"
      className="rounded-full p-2 hover:bg-gray-200/70 active:bg-gray-300 transition"
    >
      <Image src="/Question.PNG" alt="Help" width={20} height={20} />
    </button>
  );
}



