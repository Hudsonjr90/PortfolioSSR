import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const companyId = getRouterParam(event, 'companyId')!

  return prisma.schedule.findMany({
    where: { companyId },
    orderBy: { dayOfWeek: 'asc' },
  })
})
