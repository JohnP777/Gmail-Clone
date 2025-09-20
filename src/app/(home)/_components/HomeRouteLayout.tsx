// The _components folder is used to store layout-related components that are used in multiple pages within a route.
// This is a good practice because it allows you to reuse components across different pages without having to copy and paste the same code multiple times.
// You can also define page specific layout components in the _components folder.

import Link from "next/link";
import type { ReactNode } from "react";
import Header from "~/features/shared/components/Header";
import InboxSectionHeader from "./InboxSectionHeader";
import InboxSectionTabs from "./InboxSectionTabs";
import LeftSidebar from "~/features/shared/components/LeftSidebar";
import RightSidebar from "~/features/shared/components/RightSidebar";
import { auth } from "~/server/auth";
import RecentEmailsList from "../../../features/emails/components/RecentEmailsList";

export default async function HomeRouteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return (
      <main className="min-h-screen bg-[#f9fafd] text-gray-900">
        <div className="pt-[52px]" />
        <div className="flex flex-col items-center justify-start gap-4 pt-8">
          <Link
            href="/api/auth/signin"
            className="rounded-full bg-gradient-to-r from-[hsl(280,100%,70%)] to-[hsl(240,100%,70%)] px-8 py-3 font-semibold text-white no-underline transition-all duration-200 hover:scale-105 hover:shadow-lg relative z-[9999]"
          >
            Sign in
          </Link>
          
          <div className="text-center">
            <p className="text-xl text-gray-400">
              Sign in to access your Gmail
            </p>
          </div>
        </div>
      </main>
    );
  }

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
            <RecentEmailsList />
            {children}
          </div>
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </main>
  );
}




