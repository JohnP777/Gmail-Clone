import { Suspense } from "react";
import Link from "next/link";

import { LoadingSpinner } from "~/features/shared/components/LoadingSpinner";

import { HomePageContent } from "./_components/HomePageContent";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}

      {/* Using Suspense here as HomePageContent is the boundary of static and dynamic content, everything within it is dynamic, you'll see the magic of PPR here */}
      <Suspense fallback={<LoadingSpinner />}>
        <HomePageContent />
      </Suspense>
    </div>
  );
}
