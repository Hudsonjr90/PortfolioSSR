import { z } from 'zod'
import { prisma } from '~/server/utils/prisma'
import { requireRole } from '~/server/utils/session'

const schema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  duration: z.number().int().positive(),
  price: z.number().nonnegative().optional(),
  companyId: z.string(),
})

export default defineEventHandler(async (event) => {
  const session = await requireRole(event, ['ADVERTISER', 'ADMIN'])
  const body = await readBody(event)
  const data = schema.parse(body)

  const company = await prisma.company.findUnique({ where: { id: data.companyId } })
  if (!company) {
    throw createError({ statusCode: 404, statusMessage: 'Empresa não encontrada' })
  }

  const userRole = (session.user as { role?: string }).role
  if (userRole !== 'ADMIN' && company.ownerId !== session.user.id) {
    throw createError({ statusCode: 403, statusMessage: 'Sem permissão' })
  }

  return prisma.service.create({ data })
})
