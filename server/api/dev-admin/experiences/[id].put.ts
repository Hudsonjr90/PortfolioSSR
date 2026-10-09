import { createError, defineEventHandler, getRouterParam } from 'h3'
import { prisma } from '../../../utils/prisma'
import { requireDevAdminSession } from '../../../utils/dev-admin'
import { throwAdminRecordError, validateTechnologyIds } from '../../../utils/admin-records'
import { experienceInputSchema, readAdminRecordBody, toDate } from '../../../utils/admin-record-input'

export default defineEventHandler(async (event) => {
  requireDevAdminSession(event)
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Experience id is required' })

  const input = await readAdminRecordBody(event, experienceInputSchema)
  if (input.endDate && new Date(input.endDate) < new Date(input.startDate)) {
    throw createError({ statusCode: 400, statusMessage: 'End date must not precede start date' })
  }

  const technologyIds = await validateTechnologyIds(input.technologyIds)
  const { technologyIds: _, ...experience } = input

  try {
    return await prisma.experience.update({
      where: { id },
      data: {
        ...experience,
        startDate: toDate(input.startDate)!,
        endDate: toDate(input.endDate),
        technologies: {
          deleteMany: {},
          create: technologyIds.map((technologyId) => ({ technologyId })),
        },
      },
      include: { technologies: { include: { technology: true } } },
    })
  } catch (error) {
    throwAdminRecordError(error, 'Experience')
  }
})
