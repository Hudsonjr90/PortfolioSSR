import { defineEventHandler } from 'h3'
import { prisma } from '../../utils/prisma'
import { requireDevAdminSession } from '../../utils/dev-admin'
import { readAdminRecordBody, technologyInputSchema } from '../../utils/admin-record-input'
import { throwAdminRecordError } from '../../utils/admin-records'

export default defineEventHandler(async (event) => {
  requireDevAdminSession(event)
  const input = await readAdminRecordBody(event, technologyInputSchema)

  try {
    return await prisma.technology.create({ data: input })
  } catch (error) {
    throwAdminRecordError(error, 'Technology')
  }
})
