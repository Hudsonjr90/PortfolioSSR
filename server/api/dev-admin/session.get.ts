import { defineEventHandler } from 'h3'
import { requireDevAdminSession } from '../../utils/dev-admin'

export default defineEventHandler((event) => {
  requireDevAdminSession(event)
  return { authenticated: true }
})
