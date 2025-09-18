// The _components folder is used to store layout-related components that are used in multiple pages within a route.
// This is a good practice because it allows you to reuse components across different pages without having to copy and paste the same code multiple times.
// You can also define page specific layout components in the _components folder.

import Header from "~/features/shared/components/Header";
import InboxSectionHeader from "./InboxSectionHeader";
import InboxSectionTabs from "./InboxSectionTabs";
import LeftSidebar from "~/features/shared/components/LeftSidebar";
import RightSidebar from "~/features/shared/components/RightSidebar";

export default function HomeRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f9fafd] text-gray-900">
      <Header />
      <div className="pt-[52px]" />
      <div className="mx-auto flex w-full max-w-[1600px] gap-4 p-4 md:pr-6 py-4">
        {/* Left Sidebar */}
        <div className="-ml-4">
          <LeftSidebar />
        </div>

        {/* Main center pane */}
        <div className="flex-1">
          <div className="rounded-2xl bg-white shadow-sm min-h-[90vh]">
            <div className="px-3 py-2 rounded-t-2xl">
              <InboxSectionHeader />
            </div>
            <InboxSectionTabs />
            {children}
          </div>
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </main>
  );
}




