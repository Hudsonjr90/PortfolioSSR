import { createError, defineEventHandler, getRouterParam } from 'h3'
import { prisma } from '../../../utils/prisma'
import { requireDevAdminSession } from '../../../utils/dev-admin'
import { readProjectInput } from '../../../utils/project-input'

export default defineEventHandler(async (event) => {
  requireDevAdminSession(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Project id is required' })
  }

  const data = await readProjectInput(event)

  try {
    return await prisma.project.update({
      where: { id },
      data,
    })
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      throw createError({ statusCode: 409, statusMessage: 'Project slug already exists' })
    }

    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      throw createError({ statusCode: 404, statusMessage: 'Project not found' })
    }

    throw error
  }
})
