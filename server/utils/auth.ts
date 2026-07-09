import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './prisma'

const baseURL = process.env.BETTER_AUTH_URL || process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const auth = betterAuth({
  baseURL,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  user: {
    additionalFields: {
      cpf: { type: 'string', required: false },
      phone: { type: 'string', required: false },
      role: { type: 'string', required: false, defaultValue: 'CLIENT' },
    },
  },
  trustedOrigins: [baseURL],
})

export type Session = typeof auth.$Infer.Session
