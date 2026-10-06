import { defineEventHandler } from 'h3'
import { clearDevAdminSession, requireDevelopment } from '../../utils/dev-admin'

export default defineEventHandler((event) => {
  requireDevelopment(event)
  clearDevAdminSession(event)
  return { authenticated: false }
})
