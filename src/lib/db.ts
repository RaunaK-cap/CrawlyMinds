import { PrismaClient } from "../generated/prisma/client"


const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prismaclient=
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaclient

console.log("database connected ..")