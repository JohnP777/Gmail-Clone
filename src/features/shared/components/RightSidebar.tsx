import CalendarButton from "./ui/CalendarButton";
import KeepButton from "./ui/KeepButton";
import TasksButton from "./ui/TasksButton";
import ContactsButton from "./ui/ContactsButton";
import AddonsButton from "./ui/AddonsButton";



export default function RightSidebar() {
  return (
    <aside className="w-[22px] shrink-0 mt-5">
      <div className="space-y-10">
        <CalendarButton />
        <KeepButton />
        <TasksButton />
        <ContactsButton />
        <AddonsButton />
      </div>
    </aside>

  );
}



