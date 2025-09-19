"use client";

import Select from "./InboxUI/Select";
import RefreshButton from "./InboxUI/RefreshButton";
import MoreButton from "./InboxUI/MoreButton";
import Previous from "./InboxUI/Previous";
import Next from "./InboxUI/Next";

export default function InboxSectionHeader() {
  return (
    <div className="flex items-center justify-between w-full px-2 py-1">
      <div className="flex items-center gap-0">
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <Select />
        </div>
        
        <div className="flex items-center gap-1 ml-4">
          <RefreshButton />
          <MoreButton />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Previous />
        <Next />
      </div>
    </div>
  );
}
