import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const { companyId } = getQuery(event)
  if (!companyId) {
    throw createError({ statusCode: 400, statusMessage: 'companyId é obrigatório' })
  }

  return prisma.service.findMany({
    where: { companyId: String(companyId), isActive: true },
    orderBy: { name: 'asc' },
  })
})
