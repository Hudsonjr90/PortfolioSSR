import { auth } from './auth'
import type { H3Event } from 'h3'

export async function getAuthSession(event: H3Event) {
  return auth.api.getSession({
    headers: getRequestHeaders(event) as unknown as Headers,
  })
}

export async function requireSession(event: H3Event) {
  const session = await getAuthSession(event)
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return session
}

export async function requireRole(event: H3Event, roles: string[]) {
  const session = await requireSession(event)
  if (!roles.includes((session.user as { role?: string }).role ?? '')) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
  return session
}
