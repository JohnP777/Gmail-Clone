"use client";

import Image from "next/image";

export default function Profile() {
  return (
    <button
      type="button"
      aria-label="Profile"
      className="rounded-full p-1 hover:bg-gray-200/70 active:bg-gray-300 transition cursor-pointer"
    >
      <Image src="/Profile.PNG" alt="Profile" width={32} height={32} className="rounded-full" />
    </button>
  );
}


