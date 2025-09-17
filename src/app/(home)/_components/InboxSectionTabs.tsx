"use client";

import Primary from "./InboxUI/Primary";
import Promotion from "./InboxUI/Promotion";
import Social from "./InboxUI/Social";

export default function InboxSectionTabs() {
  return (
    <div className="w-full border-b border-gray-200">
      <div className="flex items-center gap-6 px-3">
        <Primary />
        <Promotion />
        <Social />
      </div>
    </div>
  );
}


