"use client";

import Image from "next/image";

export default function ContactsButton() {
  return (
    <button
      type="button"
      aria-label="Contacts"
      className="rounded-full ml-1 hover:bg-gray-200/70 active:bg-gray-300 transition cursor-pointer"
    >
      <Image src="/Contacts.PNG" alt="Contacts" width={28} height={28} />
    </button>
  );
}



