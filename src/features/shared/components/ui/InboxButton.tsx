"use client";

import Image from "next/image";
import { useLabel } from "~/contexts/LabelContext";
import { Label } from "~/types/label";

export default function InboxButton() {
  const { currentLabel, setCurrentLabel } = useLabel();
  
  // Check if current label is one of the inbox categories
  const isInboxCategory = currentLabel === Label.PRIMARY || currentLabel === Label.PROMOTIONS || currentLabel === Label.SOCIAL;
  
  // Get the appropriate styling based on whether it's an inbox category
  const buttonClasses = isInboxCategory
    ? "flex items-center gap-4 h-8 w-62 rounded-2xl bg-[#cfeeff] hover:bg-[#bfe5ff] active:bg-[#a7dbff] text-black px-9 py-3 shadow-sm transition cursor-pointer"
    : "flex items-center gap-4 h-8 w-62 rounded-2xl bg-[#f9fafd] hover:bg-gray-200/70 text-black px-9 py-3 cursor-pointer";
  
  const textClasses = isInboxCategory
    ? "font-semibold text-[14px]"
    : "text-[14px]";

  return (
    <button
      type="button"
      aria-label="Inbox"
      onClick={() => setCurrentLabel(Label.PRIMARY)} 
      className={buttonClasses}
    >
      <Image src="/Primary.PNG" alt="Inbox" width={16} height={16} />
      <span className={textClasses}>
        Inbox
      </span>
    </button>
  );
}


