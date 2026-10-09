import { createError, defineEventHandler, getRouterParam } from 'h3'
import { prisma } from '../../../utils/prisma'
import { requireDevAdminSession } from '../../../utils/dev-admin'
import { throwAdminRecordError } from '../../../utils/admin-records'

export default defineEventHandler(async (event) => {
  requireDevAdminSession(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Testimonial id is required' })

  try {
    await prisma.testimonial.delete({ where: { id } })
    return { deleted: true }
  } catch (error) {
    throwAdminRecordError(error, 'Testimonial')
  }
})
