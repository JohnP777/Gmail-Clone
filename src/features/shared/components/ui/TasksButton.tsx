"use client";

import Image from "next/image";

export default function TasksButton() {
  return (
    <button
      type="button"
      aria-label="Tasks"
      className="rounded-full ml-1 hover:bg-gray-200/70 active:bg-gray-300 transition cursor-pointer"
    >
      <Image src="/Tasks.PNG" alt="Tasks" width={28} height={28} />
    </button>
  );
}



