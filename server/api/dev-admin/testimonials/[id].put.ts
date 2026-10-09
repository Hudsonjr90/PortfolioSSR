import { createError, defineEventHandler, getRouterParam } from 'h3'
import { prisma } from '../../../utils/prisma'
import { requireDevAdminSession } from '../../../utils/dev-admin'
import { requireExperience, throwAdminRecordError } from '../../../utils/admin-records'
import { readAdminRecordBody, testimonialInputSchema } from '../../../utils/admin-record-input'

export default defineEventHandler(async (event) => {
  requireDevAdminSession(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Testimonial id is required' })

  const input = await readAdminRecordBody(event, testimonialInputSchema)
  await requireExperience(input.experienceId)

  try {
    return await prisma.testimonial.update({ where: { id }, data: input })
  } catch (error) {
    throwAdminRecordError(error, 'Testimonial')
  }
})
