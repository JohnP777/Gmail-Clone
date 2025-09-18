"use client";

import Image from "next/image";

export default function CalendarButton() {
  return (
    <button
      type="button"
      aria-label="Calendar"
      className="rounded-full hover:bg-gray-200/70 ml-1 active:bg-gray-300 transition cursor-pointer"
    >
      <Image src="/Calendar.PNG" alt="Calendar" width={28} height={28} />
    </button>
  );
}   



