import { type PrismaClient } from "@prisma/client";

import { ServiceRuntime } from "~/services";
import { Database } from "~/services/database";

const globalForDb = globalThis as unknown as {
  db: PrismaClient | undefined;
  runtime: typeof ServiceRuntime | undefined;
};

/**
 * The database instance is created by the ServiceRuntime
 * and is available in the server context
 *
 * In development, Next.js may create multiple processes, so we use
 * a singleton pattern to ensure only one instance per process
 */
if (!globalForDb.db) {
  // Create a new runtime instance for this process
  globalForDb.runtime = ServiceRuntime;
  globalForDb.db = globalForDb.runtime.runSync(Database);
  console.log(`[db.ts] Database service initialized (PID: ${process.pid})`);

  // Only in development, handle graceful shutdown for worker processes
  if (process.env.NODE_ENV === "development") {
    // Next.js worker processes exit via beforeExit
    process.once("beforeExit", () => {
      console.log(
        `[db.ts] Process beforeExit, disposing database... (PID: ${process.pid})`
      );
      globalForDb.runtime
        ?.dispose()
        .then(() =>
          console.log(
            `[db.ts] Database disposed successfully (PID: ${process.pid})`
          )
        )
        .catch(() => {
          // Ignore disposal errors in dev
        });
    });
  }
}

export const db = globalForDb.db;
