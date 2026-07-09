import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).optional(),
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve ter 11 dígitos').optional(),
  phone: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const session = await requireSession(event)
  const body = await readBody(event)
  const data = schema.parse(body)

  return prisma.user.update({
    where: { id: session.user.id },
    data,
    select: { id: true, name: true, email: true, cpf: true, phone: true, role: true },
  })
})
