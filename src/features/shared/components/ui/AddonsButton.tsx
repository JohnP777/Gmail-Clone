"use client";

import Image from "next/image";

export default function AddonsButton() {
  return (
    <button
      type="button"
      aria-label="Addons"
      className="rounded-full ml-1 hover:bg-gray-200/70 active:bg-gray-300 transition cursor-pointer"
    >
      <Image src="/Add.PNG" alt="Addons" width={28} height={28} />
    </button>
  );
}



