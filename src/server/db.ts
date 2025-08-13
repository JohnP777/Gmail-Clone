import console from "console";
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

  // Shared, idempotent runtime disposer
  const disposeRuntime = async (reason: string) => {
    console.log(
      `[db.ts] Disposing database due to ${reason} (PID: ${process.pid})`
    );
    await globalForDb.runtime?.dispose();
    console.log(`[db.ts] Database disposed successfully (PID: ${process.pid})`);
  };

  if (process.env.NODE_ENV === "development") {
    process.once("beforeExit", () => {
      console.log(`[db.ts] Process beforeExit (PID: ${process.pid})`);
      void disposeRuntime("beforeExit");
    });
  } else {
    process.once("SIGTERM", () => {
      void disposeRuntime("SIGTERM");
    });
    process.once("SIGINT", () => {
      void disposeRuntime("SIGINT");
    });
  }
}

export const db = globalForDb.db;
