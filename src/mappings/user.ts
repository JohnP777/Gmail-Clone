import type { User } from "~/types/user";
import { Schema } from "@effect/schema";
import { Prisma } from "@prisma/client";
import { Effect, pipe } from "effect";

import { ValidationError } from "~/types/errors";
import { UserSchema } from "~/types/user";

export const UserQuery = Prisma.validator<Prisma.UserDefaultArgs>()({});

/**
 * Maps Prisma User to domain User type using Effect
 * Includes validation to ensure data integrity
 */
export const PrismaUserToUser = (
  user: Prisma.UserGetPayload<typeof UserQuery>
): Effect.Effect<User, ValidationError> => {
  const userData = {
    id: user.id,
    name: user.name ?? "",
    email: user.email ?? "",
    image: user.image ?? "",
    emailVerified: user.emailVerified ?? undefined,
  };

  return pipe(
    Schema.decodeUnknown(UserSchema)(userData),
    Effect.mapError(
      (error) =>
        new ValidationError({
          field: "user",
          reason: String(error),
        })
    )
  );
};

/**
 * Sync version for backward compatibility
 * Note: This will throw if validation fails
 */
export const PrismaUserToUserSync = (
  user: Prisma.UserGetPayload<typeof UserQuery>
): User => {
  return {
    id: user.id,
    name: user.name ?? "",
    email: user.email ?? "",
    image: user.image ?? "",
    emailVerified: user.emailVerified ?? undefined,
  };
};

/**
 * Maps domain User to Prisma create input
 */
export const UserToPrismaCreate = (user: Omit<User, "id">) => ({
  name: user.name,
  email: user.email,
  image: user.image,
  emailVerified: user.emailVerified,
});

/**
 * Maps domain User to Prisma update input
 */
export const UserToPrismaUpdate = (user: Partial<User>) => {
  const update: Prisma.UserUpdateInput = {};

  if (user.name !== undefined) update.name = user.name;
  if (user.email !== undefined) update.email = user.email;
  if (user.image !== undefined) update.image = user.image;
  if (user.emailVerified !== undefined)
    update.emailVerified = user.emailVerified;

  return update;
};
