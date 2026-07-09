import { z } from 'zod'
import { prisma } from '~/server/utils/prisma'
import { requireRole } from '~/server/utils/session'

const schema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  duration: z.number().int().positive().optional(),
  price: z.number().nonnegative().optional(),
  isActive: z.boolean().optional(),
})

export default defineEventHandler(async (event) => {
  const session = await requireRole(event, ['ADVERTISER', 'ADMIN'])
  const id = getRouterParam(event, 'id')!
  const body = await readBody(event)
  const data = schema.parse(body)

  const service = await prisma.service.findUnique({ where: { id }, include: { company: true } })
  if (!service) {
    throw createError({ statusCode: 404, statusMessage: 'Serviço não encontrado' })
  }

  const userRole = (session.user as { role?: string }).role
  if (userRole !== 'ADMIN' && service.company.ownerId !== session.user.id) {
    throw createError({ statusCode: 403, statusMessage: 'Sem permissão' })
  }

  return prisma.service.update({ where: { id }, data })
})
