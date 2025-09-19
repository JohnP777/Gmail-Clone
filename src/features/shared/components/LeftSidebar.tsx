import ComposeButton from "./ui/ComposeButton";
import InboxButton from "./ui/InboxButton";
import StarredButton from "./ui/StarredButton";
import SentButton from "./ui/SentButton";
import DraftsButton from "./ui/DraftsButton";
import TrashButton from "./ui/TrashButton";

export default function LeftSidebar() {
  return (
    <aside className="w-[240px] shrink-0 space-y-2.5">
      <div className="p-2">
        <ComposeButton />
      </div>
      
      {/* Left sidebar buttons */} 
      <div className="-ml-2 space-y-0.5">
        <InboxButton />
        <StarredButton />
        <SentButton />
        <DraftsButton />
        <TrashButton />
      </div>
    </aside>
  );
}


