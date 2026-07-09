import { z } from 'zod'

const schema = z.object({
  role: z.enum(['ADMIN', 'ADVERTISER', 'CLIENT']).optional(),
  name: z.string().min(2).optional(),
})

export default defineEventHandler(async (event) => {
  await requireRole(event, ['ADMIN'])
  const id = getRouterParam(event, 'id')!
  const body = await readBody(event)
  const data = schema.parse(body)

  return prisma.user.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, role: true },
  })
})
