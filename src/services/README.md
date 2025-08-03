# Effect.Service Architecture

This directory contains the refactored backend services using Effect.ts, providing type-safe, composable, and testable service layers.

## Architecture Overview

### Core Concepts

1. **Services as Tags**: Each service is defined using `Context.Tag`, providing type-safe dependency injection
2. **Effect-based Operations**: All service methods return `Effect<Success, Error>` for explicit error handling
3. **Layer Composition**: Services are composed using Effect's Layer system for dependency management
4. **Runtime Management**: A single AppRuntime manages all service dependencies

### Directory Structure

```
src/services/
├── database/
│   └── service.ts       # Database service using PrismaClient
├── post/
│   ├── service.ts       # Original PostService (legacy)
│   └── effect-service.ts # Effect-based PostService
├── errors.ts            # Typed error definitions
├── index.ts             # Service composition and exports
├── trpc-effect-bridge.ts # TRPC integration utilities
└── README.md            # This file
```

## Key Components

### 1. Database Service (`database/service.ts`)

Wraps PrismaClient in an Effect service:

```typescript
export class Database extends Context.Tag("Database")<
  Database,
  PrismaClient
>() {
  static readonly Live = Layer.effect(Database, Effect.sync(() => new PrismaClient()));
}
```

### 2. PostService (`post/effect-service.ts`)

Implements post operations using Effect:

```typescript
export class PostService extends Context.Tag("PostService")<
  PostService,
  {
    createPost: (input: CreatePostInput) => Effect.Effect<Post, ValidationError | DatabaseError>;
    getPost: (id: string) => Effect.Effect<PostWithUser, NotFoundError | DatabaseError>;
    // ... other methods
  }
>() {}
```

### 3. Error Types (`errors.ts`)

Typed errors for better error handling:

- `NotFoundError`: Resource not found
- `ValidationError`: Input validation failures
- `DatabaseError`: Database operation failures
- `UnauthorizedError`: Authorization failures

### 4. TRPC Bridge (`trpc-effect-bridge.ts`)

Utilities to integrate Effect with TRPC:

- `mapEffectErrorToTRPC`: Maps Effect errors to TRPC errors
- `runEffectInTRPC`: Executes Effects in TRPC context
- `createEffectProcedure`: Creates TRPC-compatible Effect handlers

## Usage Examples

### In TRPC Routers

```typescript
import { effectToTRPC } from "~/services/trpc-effect-bridge";
import { postServiceOperations } from "~/services";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const runEffect = effectToTRPC(ctx.runtime);
      return runEffect(
        postServiceOperations.createPost({ 
          name: input.name,
          createdBy: { id: ctx.session.user.id }
        })
      );
    }),
});
```

### Testing

```typescript
import { createTestLayer } from "~/services";

const mockDb = createMockPrismaClient();
const testLayer = createTestLayer(mockDb);
const testRuntime = ManagedRuntime.make(testLayer);

// Run tests with mocked dependencies
const result = await testRuntime.runPromise(
  postServiceOperations.createPost(testInput)
);
```

## Benefits

1. **Type Safety**: Full type inference for services and errors
2. **Composability**: Services can be easily composed and extended
3. **Testability**: Easy to mock services for testing
4. **Error Handling**: Explicit, typed error handling
5. **Dependency Injection**: Automatic dependency resolution
6. **Resource Management**: Proper cleanup and lifecycle management

## Migration Notes

The original `PostService` in `post/service.ts` is preserved for backward compatibility. New features should use the Effect-based services.

To migrate existing code:
1. Replace direct service calls with Effect operations
2. Update error handling to use typed errors
3. Use `effectToTRPC` bridge in TRPC routers
4. Update tests to use the test layer system