import { createError, defineEventHandler } from 'h3'
import { prisma } from '../../utils/prisma'
import { requireDevAdminSession } from '../../utils/dev-admin'
import { readProjectInput } from '../../utils/project-input'

export default defineEventHandler(async (event) => {
  requireDevAdminSession(event)
  const data = await readProjectInput(event)

  try {
    return await prisma.project.create({ data })
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      throw createError({ statusCode: 409, statusMessage: 'Project slug already exists' })
    }

    throw error
  }
})
