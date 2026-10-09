import { defineEventHandler } from 'h3'
import { prisma } from '../../utils/prisma'
import { requireDevAdminSession } from '../../utils/dev-admin'

export default defineEventHandler((event) => {
  requireDevAdminSession(event)

  return prisma.technology.findMany({
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: { experiences: { select: { experienceId: true } } },
  })
})
