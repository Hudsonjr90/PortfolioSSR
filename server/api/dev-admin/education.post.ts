import { createError, defineEventHandler } from 'h3'
import { prisma } from '../../utils/prisma'
import { requireDevAdminSession } from '../../utils/dev-admin'
import { requireProfileId } from '../../utils/admin-records'
import { educationInputSchema, readAdminRecordBody, toDate } from '../../utils/admin-record-input'

export default defineEventHandler(async (event) => {
  requireDevAdminSession(event)
  const input = await readAdminRecordBody(event, educationInputSchema)
  const profileId = await requireProfileId()

  if (input.startDate && input.endDate && new Date(input.endDate) < new Date(input.startDate)) {
    throw createError({ statusCode: 400, statusMessage: 'End date must not precede start date' })
  }

  return prisma.education.create({
    data: {
      ...input,
      profileId,
      startDate: toDate(input.startDate),
      endDate: toDate(input.endDate),
    },
  })
})
