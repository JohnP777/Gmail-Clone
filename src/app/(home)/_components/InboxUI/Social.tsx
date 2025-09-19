"use client";

import Image from "next/image";
import { useLabel } from "~/contexts/LabelContext";
import { Label } from "~/types/label";

export default function Social() {
  const { currentLabel, setCurrentLabel } = useLabel();
  const isSelected = currentLabel === Label.SOCIAL;

  return (
    <button
      type="button"
      aria-label="Social"
      onClick={() => setCurrentLabel(Label.SOCIAL)}
      className={`inline-flex items-center gap-2 px-4 py-3 w-[240px] justify-start cursor-pointer hover:bg-gray-100 ${
        isSelected
          ? "text-blue-600 border-b-4 border-blue-600 font-medium"
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      <Image src="/Social.PNG" alt="Social" width={16} height={16}/>
      <span className="text-sm pl-2">Social</span>
    </button>
  );
}


