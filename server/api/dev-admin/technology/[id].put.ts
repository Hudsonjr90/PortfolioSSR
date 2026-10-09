import { createError, defineEventHandler, getRouterParam } from 'h3'
import { prisma } from '../../../utils/prisma'
import { requireDevAdminSession } from '../../../utils/dev-admin'
import { readAdminRecordBody, technologyInputSchema } from '../../../utils/admin-record-input'
import { throwAdminRecordError } from '../../../utils/admin-records'

export default defineEventHandler(async (event) => {
  requireDevAdminSession(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Technology id is required' })
  const input = await readAdminRecordBody(event, technologyInputSchema)

  try {
    return await prisma.technology.update({ where: { id }, data: input })
  } catch (error) {
    throwAdminRecordError(error, 'Technology')
  }
})
