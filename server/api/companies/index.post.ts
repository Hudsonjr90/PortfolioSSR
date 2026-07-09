import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  description: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  address: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const session = await requireRole(event, ['ADVERTISER', 'ADMIN'])
  const body = await readBody(event)
  const data = schema.parse(body)

  const existing = await prisma.company.findUnique({ where: { slug: data.slug } })
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Slug já está em uso' })
  }

  const alreadyHasCompany = await prisma.company.findUnique({
    where: { ownerId: session.user.id },
  })
  if (alreadyHasCompany) {
    throw createError({ statusCode: 409, statusMessage: 'Você já possui uma empresa cadastrada' })
  }

  return prisma.company.create({
    data: { ...data, ownerId: session.user.id },
  })
})
