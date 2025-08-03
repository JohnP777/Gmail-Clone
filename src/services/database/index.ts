import { Effect, Context, Layer } from "effect";
import { PrismaClient } from "@prisma/client";
import { env } from "~/env";

/**
 * Database Service Tag
 * Defines the database service interface using Effect's Context.Tag
 * This provides type-safe dependency injection for database operations
 */
export class Database extends Context.Tag("Database")<
  Database,
  PrismaClient
>() {
  /**
   * Live implementation of the Database service
   * Creates and configures a PrismaClient instance
   */
  static readonly Live = Layer.effect(
    Database,
    Effect.sync(() => {
      const prisma = new PrismaClient({
        log:
          env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
      });

      // Handle cleanup
      if (typeof globalThis !== "undefined") {
        const globalWithPrisma = globalThis as unknown as {
          prisma: PrismaClient | undefined;
        };
        
        if (env.NODE_ENV !== "production") {
          // In development, reuse the client to avoid exhausting connections
          if (globalWithPrisma.prisma) {
            return globalWithPrisma.prisma;
          }
          globalWithPrisma.prisma = prisma;
        }
      }

      return prisma;
    })
  );

  /**
   * Test implementation for unit testing
   * Can be overridden with a mock PrismaClient
   */
  static readonly Test = (mockClient: PrismaClient) =>
    Layer.succeed(Database, mockClient);
}

/**
 * Helper to access the database service in Effect programs
 * @example
 * Effect.gen(function* () {
 *   const db = yield* Database
 *   const posts = yield* Effect.tryPromise(() => db.post.findMany())
 * })
 */
export const getDatabase = Database;