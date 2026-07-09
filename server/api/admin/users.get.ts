import { prisma } from '~/server/utils/prisma'
import { requireRole } from '~/server/utils/session'

export default defineEventHandler(async (event) => {
  await requireRole(event, ['ADMIN'])
  const { role, search } = getQuery(event)

  return prisma.user.findMany({
    where: {
      ...(role ? { role: String(role) as 'ADMIN' | 'ADVERTISER' | 'CLIENT' } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: String(search), mode: 'insensitive' } },
              { email: { contains: String(search), mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    select: { id: true, name: true, email: true, cpf: true, phone: true, role: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  })
})
