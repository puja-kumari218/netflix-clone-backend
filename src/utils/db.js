import { PrismaClient } from "@prisma/client";

const client = globalThis.prismaDb || new PrismaClient();

if (process.env.NODE_ENV === "production") globalThis.prismaDb = client;

export default client;
