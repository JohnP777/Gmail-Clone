"use client";

import Primary from "./InboxUI/Primary";
import Promotion from "./InboxUI/Promotion";
import Social from "./InboxUI/Social";
import { useState } from "react";

export default function InboxSectionTabs() {
  const [selectedLabel, setSelectedLabel] = useState<"Primary" | "Promotions" | "Social">("Primary");

  return (
    <div className="w-full border-b border-gray-200">
      <div className="flex items-center">
        <Primary selected={selectedLabel === "Primary"} onClick={() => setSelectedLabel("Primary")} />
        <Promotion selected={selectedLabel === "Promotions"} onClick={() => setSelectedLabel("Promotions")} />
        <Social selected={selectedLabel === "Social"} onClick={() => setSelectedLabel("Social")} />
      </div>
    </div>
  );
}


