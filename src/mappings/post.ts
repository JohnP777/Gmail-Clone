import type { Post, PostWithUser } from "~/types/post";
import { Schema } from "@effect/schema";
import { Prisma } from "@prisma/client";
import { Effect, pipe } from "effect";

import { ValidationError } from "~/types/errors";
import { PostSchema, PostWithUserSchema } from "~/types/post";

import { PrismaUserToUser, UserQuery } from "./user";

/**
 * Prisma query configuration for basic Post fetching
 */
export const PostQuery = Prisma.validator<Prisma.PostDefaultArgs>()({});

/**
 * Prisma query configuration for Post with User relation
 */
export const PostWithUserQuery = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: {
    createdBy: UserQuery,
  },
});

/**
 * Maps Prisma Post to domain Post type using Effect
 * Includes validation to ensure data integrity
 */
export const PrismaPostToPost = (
  post: Prisma.PostGetPayload<typeof PostQuery>
): Effect.Effect<Post, ValidationError> => {
  const postData = {
    id: post.id,
    name: post.name,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };

  return pipe(
    Schema.decodeUnknown(PostSchema)(postData),
    Effect.mapError(
      (error) =>
        new ValidationError({
          field: "post",
          reason: String(error),
        })
    )
  );
};

/**
 * Maps Prisma Post with relations to domain PostWithUser type using Effect
 * Demonstrates handling nested relations with validation
 */
export const PrismaPostWithUserToPostWithUser = (
  post: Prisma.PostGetPayload<typeof PostWithUserQuery>
): Effect.Effect<PostWithUser, ValidationError> => {
  return pipe(
    Effect.all({
      post: PrismaPostToPost(post),
      user: PrismaUserToUser(post.createdBy),
    }),
    Effect.map(({ post, user }) => ({
      ...post,
      createdBy: user,
    })),
    Effect.flatMap((data) =>
      pipe(
        Schema.decodeUnknown(PostWithUserSchema)(data),
        Effect.mapError(
          (error) =>
            new ValidationError({
              field: "postWithUser",
              reason: String(error),
            })
        )
      )
    )
  );
};

/**
 * Maps domain Post to Prisma create input
 */
export const PostToPrismaCreate = (
  post: Omit<Post, "id" | "createdAt" | "updatedAt">,
  createdById: string
): Prisma.PostCreateInput => ({
  name: post.name,
  createdBy: {
    connect: { id: createdById },
  },
});

/**
 * Maps domain Post to Prisma update input
 */
export const PostToPrismaUpdate = (
  post: Partial<Omit<Post, "id" | "createdAt" | "updatedAt">>
) => {
  const update: Prisma.PostUpdateInput = {};

  if (post.name !== undefined) update.name = post.name;

  return update;
};
