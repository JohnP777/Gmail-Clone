"use client";

import Image from "next/image";
import { useState } from "react";

export default function SearchBar() {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={
        [
          "flex items-center gap-3",
          "rounded-full",
          focused ? "bg-white" : "bg-[#e9eef6]",
          "px-3 md:px-4 py-2",
          "w-full max-w-[720px]",
          "transition-colors",
          "h-12"
        ].join(" ")
      }
    >
      <Image src="/Search.PNG" alt="Search" width={18} height={18} />
      <input
        type="text"
        placeholder="Search mail"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent outline-none placeholder:text-gray-500 text-[15px]"
      />
      <Image src="/Filter.PNG" alt="Filter" width={22} height={22} />
    </div>
  );
}


