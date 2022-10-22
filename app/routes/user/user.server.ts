import type { User } from "@prisma/client";
import { prisma } from "~/database/db.server";

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}
