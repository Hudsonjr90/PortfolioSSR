import { defineEventHandler } from 'h3'
import { prisma } from '../../utils/prisma'
import { requireDevAdminSession } from '../../utils/dev-admin'

export default defineEventHandler((event) => {
  requireDevAdminSession(event)

  return prisma.experience.findMany({
    orderBy: [{ sortOrder: 'asc' }, { startDate: 'desc' }],
    include: {
      technologies: { include: { technology: true } },
      testimonials: { orderBy: { sortOrder: 'asc' } },
    },
  })
})
