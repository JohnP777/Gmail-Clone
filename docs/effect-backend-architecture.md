# Effect.ts Backend Architecture

## Overview

This project uses Effect.ts for the backend service layer, providing a powerful functional programming approach to building type-safe, composable, and maintainable server-side applications.

## Why Effect.ts?

### 1. **Type-Safe Error Handling**
Effect.ts provides explicit error types in function signatures, eliminating runtime surprises:

```typescript
// Traditional approach - errors are hidden
async function getPost(id: string): Promise<Post> {
  // Could throw DatabaseError, NotFoundError, ValidationError...
}

// Effect approach - all errors are explicit
function getPost(id: string): Effect.Effect<Post, NotFoundError | DatabaseError | ValidationError> {
  // Compiler ensures all errors are handled
}
```

### 2. **Dependency Injection**
Effect's Context system provides compile-time safe dependency injection:

```typescript
// Services declare their dependencies
export class PostService extends Context.Tag("PostService")<PostService, PostServiceInterface>() {
  static readonly Default = Layer.effect(
    PostService,
    Effect.gen(function* () {
      const db = yield* Database; // Type-safe dependency
      // Implementation
    })
  ).pipe(Layer.provide(Database.Live));
}
```

### 3. **Composable Service Layers**
Services can be composed together to form application layers:

```typescript
const MainLayer = Layer.mergeAll(
  PostService.Default,
  UserService.Default,
  AuthService.Default
);

export const ServiceRuntime = ManagedRuntime.make(MainLayer);
```

### 4. **Resource Management**
Effect automatically handles resource lifecycle (connections, cleanup):

```typescript
// Database connections are managed automatically
const Database = Layer.effect(
  Database,
  Effect.sync(() => new PrismaClient()),
  // Cleanup happens automatically
);
```

### 5. **Testing**
Services can be easily mocked for testing:

```typescript
const TestLayer = Layer.mergeAll(
  Database.Test(mockPrismaClient),
  PostService.Test(mockPostService)
);
```

## Architecture Patterns

### Service Definition
Services follow a consistent pattern:

1. **Define the interface** with explicit error types
2. **Create the Context.Tag** for dependency injection
3. **Implement the service** using Effect.gen
4. **Declare dependencies** using Layer.provide

### Error Handling
Errors are first-class citizens:

```typescript
// Define domain-specific errors in src/types/errors.ts
export class NotFoundError extends Data.TaggedError("NotFoundError")<{
  readonly resource: string;
  readonly id: string;
}> {}

// Use in service methods
getPost: (id: string) => Effect.Effect<Post, NotFoundError | DatabaseError>
```

### Integration with TRPC
The `effect-trpc-bridge` seamlessly converts Effect services to Promise-based APIs:

```typescript
// In TRPC router
export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      // Direct call - no Effect boilerplate
      return ctx.postService.createPost(input);
    }),
});
```

## Benefits Summary

1. **Type Safety**: Errors and dependencies are tracked at compile time
2. **Testability**: Easy to mock services and dependencies
3. **Maintainability**: Clear separation of concerns and explicit contracts
4. **Reliability**: Automatic resource management and error handling
5. **Developer Experience**: IntelliSense shows all possible errors and required dependencies
6. **Performance**: Lazy evaluation and efficient composition

## Best Practices

1. **Keep services focused**: Each service should have a single responsibility
2. **Use explicit error types**: Define domain-specific errors for better debugging
3. **Leverage layers**: Compose services using layers for flexibility
4. **Test with mocks**: Use Test layers for unit testing
5. **Document effects**: Add JSDoc comments to service methods

## Example: Adding a New Service

```typescript
// 1. Define the service interface
export interface UserServiceInterface {
  createUser: (data: CreateUserInput) => Effect.Effect<User, ValidationError | DatabaseError>;
  getUser: (id: string) => Effect.Effect<User, NotFoundError | DatabaseError>;
}

// 2. Create the service
export class UserService extends Context.Tag("UserService")<UserService, UserServiceInterface>() {
  static readonly Default = Layer.effect(
    UserService,
    Effect.gen(function* () {
      const db = yield* Database;
      
      return {
        createUser: (data) => 
          pipe(
            Schema.decodeUnknown(CreateUserSchema)(data),
            Effect.mapError((e) => new ValidationError({ field: "user", reason: String(e) })),
            Effect.flatMap((valid) => 
              Effect.tryPromise({
                try: () => db.user.create({ data: valid }),
                catch: (e) => new DatabaseError({ operation: "createUser", reason: String(e) })
              })
            )
          ),
        // ... other methods
      };
    })
  ).pipe(Layer.provide(Database.Live));
}

// 3. Add to the main layer
const MainLayer = Layer.mergeAll(PostService.Default, UserService.Default);

// 4. Use in TRPC
export const userRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.userService.createUser(input);
    }),
});
```

## Resources

- [Effect Documentation](https://effect.website)
- [Effect Schema Guide](https://effect.website/docs/guides/schema)
- [Effect Service Pattern](https://effect.website/docs/guides/context-management)