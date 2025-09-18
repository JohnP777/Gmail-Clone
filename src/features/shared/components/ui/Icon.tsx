"use client";

import Image from "next/image";

export default function Icon() {
  return (
    <button
      type="button"
      aria-label="Home"
      className="rounded-full p-2 transition cursor-pointer"
    >
      <Image src="/Logo.PNG" alt="App Icon" width={110} height={40} />
    </button>
  );
}


