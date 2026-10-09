import { defineEventHandler } from 'h3'
import { prisma } from '../../utils/prisma'
import { requireDevAdminSession } from '../../utils/dev-admin'
import { requireExperience } from '../../utils/admin-records'
import { readAdminRecordBody, testimonialInputSchema } from '../../utils/admin-record-input'

export default defineEventHandler(async (event) => {
  requireDevAdminSession(event)
  const input = await readAdminRecordBody(event, testimonialInputSchema)
  await requireExperience(input.experienceId)

  return prisma.testimonial.create({ data: input })
})
