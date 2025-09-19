"use client";

import Image from "next/image";
import { useLabel } from "~/contexts/LabelContext";
import { Label } from "~/types/label";

export default function DraftsButton() {
  const { currentLabel, setCurrentLabel } = useLabel();
  const isSelected = currentLabel === Label.DRAFTS;
  
  const buttonClasses = isSelected
    ? "flex items-center gap-4 h-8 w-62 rounded-2xl bg-[#cfeeff] hover:bg-[#bfe5ff] active:bg-[#a7dbff] text-black px-9 py-3 shadow-sm transition cursor-pointer"
    : "flex items-center gap-4 h-8 w-62 rounded-2xl bg-[#f9fafd] hover:bg-gray-200/70 text-black px-9 py-3 cursor-pointer";
  
  const textClasses = isSelected
    ? "font-semibold text-[14px]"
    : "text-[14px]";

  return (
    <button
      type="button"
      aria-label="Drafts"
      onClick={() => setCurrentLabel(Label.DRAFTS)}
      className={buttonClasses}
    >
      <Image src="/Drafts.PNG" alt="Drafts" width={14} height={14} />
      <span className={textClasses}>Drafts</span>
    </button>
  );
}


