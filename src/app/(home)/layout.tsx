// The layout.tsx file is used to define the layout for the home route.

import type { ReactNode } from "react";
import HomeRouteLayout from "./_components/HomeRouteLayout";

export const metadata = {
  title: "Home",
  description: "Home",
};

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <HomeRouteLayout>{children}</HomeRouteLayout>;
}
