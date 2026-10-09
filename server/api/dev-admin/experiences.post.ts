import { createError, defineEventHandler } from 'h3'
import { prisma } from '../../utils/prisma'
import { requireDevAdminSession } from '../../utils/dev-admin'
import { requireProfileId, validateTechnologyIds } from '../../utils/admin-records'
import { experienceInputSchema, readAdminRecordBody, toDate } from '../../utils/admin-record-input'

export default defineEventHandler(async (event) => {
  requireDevAdminSession(event)
  const input = await readAdminRecordBody(event, experienceInputSchema)
  if (input.endDate && new Date(input.endDate) < new Date(input.startDate)) {
    throw createError({ statusCode: 400, statusMessage: 'End date must not precede start date' })
  }

  const [profileId, technologyIds] = await Promise.all([
    requireProfileId(),
    validateTechnologyIds(input.technologyIds),
  ])
  const { technologyIds: _, ...experience } = input

  return prisma.experience.create({
    data: {
      ...experience,
      profileId,
      startDate: toDate(input.startDate)!,
      endDate: toDate(input.endDate),
      technologies: {
        create: technologyIds.map((technologyId) => ({ technologyId })),
      },
    },
    include: { technologies: { include: { technology: true } } },
  })
})
