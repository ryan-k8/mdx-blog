import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient(); // FIXME: throwing errors related to being in the 'edge' runtime
