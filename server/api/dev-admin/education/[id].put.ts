import { createError, defineEventHandler, getRouterParam } from 'h3'
import { prisma } from '../../../utils/prisma'
import { requireDevAdminSession } from '../../../utils/dev-admin'
import { throwAdminRecordError } from '../../../utils/admin-records'
import { educationInputSchema, readAdminRecordBody, toDate } from '../../../utils/admin-record-input'

export default defineEventHandler(async (event) => {
  requireDevAdminSession(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Education id is required' })

  const input = await readAdminRecordBody(event, educationInputSchema)
  if (input.startDate && input.endDate && new Date(input.endDate) < new Date(input.startDate)) {
    throw createError({ statusCode: 400, statusMessage: 'End date must not precede start date' })
  }

  try {
    return await prisma.education.update({
      where: { id },
      data: { ...input, startDate: toDate(input.startDate), endDate: toDate(input.endDate) },
    })
  } catch (error) {
    throwAdminRecordError(error, 'Education record')
  }
})
