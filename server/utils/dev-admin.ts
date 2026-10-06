import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'
import {
  createError,
  deleteCookie,
  getCookie,
  setCookie,
  type H3Event,
} from 'h3'

const sessionCookie = 'dev-admin-session'
const sessionLifetimeSeconds = 60 * 60 * 8
const sessions = new Map<string, number>()

export function requireDevelopment(event: H3Event) {
  if (process.env.NODE_ENV === 'production') {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  return useRuntimeConfig(event)
}

function secretsMatch(candidate: string, expected: string) {
  const candidateHash = createHash('sha256').update(candidate).digest()
  const expectedHash = createHash('sha256').update(expected).digest()
  return timingSafeEqual(candidateHash, expectedHash)
}

export function createDevAdminSession(event: H3Event, token: string) {
  const expiresAt = Date.now() + sessionLifetimeSeconds * 1000
  sessions.set(token, expiresAt)

  for (const [sessionToken, expiration] of sessions) {
    if (expiration <= Date.now()) sessions.delete(sessionToken)
  }

  setCookie(event, sessionCookie, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    path: '/api/dev-admin',
    maxAge: sessionLifetimeSeconds,
  })
}

export function issueDevAdminSession(event: H3Event, password: string) {
  const config = requireDevelopment(event)

  if (!config.devAdminPassword) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Configure DEV_ADMIN_PASSWORD to enable the development admin.',
    })
  }

  if (password.length > 1024 || !secretsMatch(password, config.devAdminPassword)) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
  }

  const token = randomBytes(32).toString('base64url')
  createDevAdminSession(event, token)
}

export function requireDevAdminSession(event: H3Event) {
  requireDevelopment(event)

  const token = getCookie(event, sessionCookie)
  const expiresAt = token ? sessions.get(token) : undefined

  if (!token || !expiresAt || expiresAt <= Date.now()) {
    if (token) sessions.delete(token)
    throw createError({ statusCode: 401, statusMessage: 'Development admin login required' })
  }

  return token
}

export function clearDevAdminSession(event: H3Event) {
  const token = getCookie(event, sessionCookie)
  if (token) sessions.delete(token)
  deleteCookie(event, sessionCookie, { path: '/api/dev-admin' })
}
