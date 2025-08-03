import { TRPCError } from "@trpc/server";
import { Effect } from "effect";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { PostService } from "~/services/post";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const createPost = Effect.gen(function* () {
        const postService = yield* PostService;

        return yield* postService.createPost({
          name: input.name,
          createdBy: {
            id: ctx.session.user.id,
          },
        });
      }).pipe(
        Effect.catchTags({
          DatabaseError: (error) => {
            return Effect.fail(
              new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: error.message,
              })
            );
          },
          ValidationError: (error) => {
            return Effect.fail(
              new TRPCError({
                code: "BAD_REQUEST",
                message: error.message,
              })
            );
          },
        })
      );

      return ctx.runtime.runPromise(createPost);
    }),

  latest: protectedProcedure.query(async ({ ctx }) => {
    const latestPost = Effect.gen(function* () {
      const postService = yield* PostService;

      return yield* postService.getLatestPost();
    }).pipe(
      Effect.catchTags({
        DatabaseError: () => {
          return Effect.fail(
            new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
            })
          );
        },
        ValidationError: () => {
          return Effect.fail(
            new TRPCError({
              code: "BAD_REQUEST",
            })
          );
        },
      })
    );
    return ctx.runtime.runPromise(latestPost);
  }),

  all: protectedProcedure.query(async ({ ctx }) => {
    const allPosts = Effect.gen(function* () {
      const postService = yield* PostService;

      return yield* postService.getAllPosts();
    }).pipe(
      Effect.catchTags({
        DatabaseError: () => {
          return Effect.fail(
            new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
            })
          );
        },
        ValidationError: () => {
          return Effect.fail(
            new TRPCError({
              code: "BAD_REQUEST",
            })
          );
        },
      })
    );
    return ctx.runtime.runPromise(allPosts);
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const getPost = Effect.gen(function* () {
        const postService = yield* PostService;

        return yield* postService.getPost(input.id);
      }).pipe(
        Effect.catchTags({
          DatabaseError: () => {
            return Effect.fail(
              new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
              })
            );
          },
          ValidationError: () => {
            return Effect.fail(
              new TRPCError({
                code: "BAD_REQUEST",
              })
            );
          },
          NotFoundError: () => {
            return Effect.fail(
              new TRPCError({
                code: "NOT_FOUND",
              })
            );
          },
        })
      );

      return ctx.runtime.runPromise(getPost);
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
