/**
 * Page Orchestration Component
 *
 * This component lives in _components because it handles:
 * - Page structure and layout decisions
 * - Data fetching coordination (what to prefetch)
 * - Loading state management
 * - Error boundary setup
 * - Authentication-based rendering logic
 *
 * Notice: All business logic components (Posts, LatestPost, etc.)
 * are imported from the features folder. This component only
 * orchestrates how they work together.
 *
 * Pattern Benefits:
 * - Clear separation between layout and business logic
 * - Easy to understand page structure at a glance
 * - Reusable feature components across different pages
 * - Centralized data fetching strategy per page
 */
import Link from "next/link";

import {
  GetPost,
  HelloMessage,
  LatestPost,
  Posts,
} from "~/features/post/components/post";
import PostErrorBoundary from "~/features/post/components/PostErrorBoundary";
import { Await } from "~/features/shared/components/Await";
import { LoadingSpinner } from "~/features/shared/components/LoadingSpinner";
import { auth } from "~/server/auth";
import { trpc } from "~/trpc/server";

export async function HomePageContent() {
  // This is to simulate auth loading time
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const session = await auth();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-start gap-4 pt-8">
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-gradient-to-r from-[hsl(280,100%,70%)] to-[hsl(240,100%,70%)] px-8 py-3 font-semibold text-white no-underline transition-all duration-200 hover:scale-105 hover:shadow-lg relative z-[9999]"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
        
        <div className="text-center">
          <p className="text-xl text-gray-400">
            Sign in to create posts and see your content
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Content */}
      {/* 
        SSR Streaming Pattern:
        - prefetch: Server-side data fetching for all child components
        - fallback: Shows while data is being streamed
        - ErrorBoundaryComponent: Handles errors in child components
        
        This pattern enables:
        1. Fast initial page load (streaming HTML)
        2. SEO-friendly server rendering
        3. Progressive enhancement as data arrives
        4. Granular error handling per component
      */}

    </>
  );
}
