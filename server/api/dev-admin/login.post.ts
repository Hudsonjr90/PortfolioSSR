import { createError, defineEventHandler, readBody } from 'h3'
import { issueDevAdminSession, requireDevelopment } from '../../utils/dev-admin'

export default defineEventHandler(async (event) => {
  requireDevelopment(event)

  const body: unknown = await readBody(event)
  if (
    !body ||
    typeof body !== 'object' ||
    !('password' in body) ||
    typeof body.password !== 'string'
  ) {
    throw createError({ statusCode: 400, statusMessage: 'A password is required' })
  }

  issueDevAdminSession(event, body.password)
  return { authenticated: true }
})
