import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  address: z.string().optional(),
  logo: z.string().url().optional(),
  evolutionApiUrl: z.string().url().optional().or(z.literal('')),
  evolutionApiToken: z.string().optional(),
  evolutionApiInstance: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const session = await requireRole(event, ['ADVERTISER', 'ADMIN'])
  const id = getRouterParam(event, 'id')!
  const body = await readBody(event)
  const data = schema.parse(body)

  const company = await prisma.company.findUnique({ where: { id } })
  if (!company) {
    throw createError({ statusCode: 404, statusMessage: 'Empresa não encontrada' })
  }

  const userRole = (session.user as { role?: string }).role
  if (userRole !== 'ADMIN' && company.ownerId !== session.user.id) {
    throw createError({ statusCode: 403, statusMessage: 'Sem permissão' })
  }

  return prisma.company.update({ where: { id }, data })
})
