import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not configured')
}

const adapter = new PrismaNeon({
  connectionString,
})

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}