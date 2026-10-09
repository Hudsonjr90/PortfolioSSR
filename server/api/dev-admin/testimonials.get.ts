import { defineEventHandler } from 'h3'
import { prisma } from '../../utils/prisma'
import { requireDevAdminSession } from '../../utils/dev-admin'

export default defineEventHandler((event) => {
  requireDevAdminSession(event)

  return prisma.testimonial.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    include: {
      experience: { select: { id: true, company: true, role: true } },
    },
  })
})
