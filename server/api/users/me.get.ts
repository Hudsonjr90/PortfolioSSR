export default defineEventHandler(async (event) => {
  const session = await requireSession(event)
  return prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, cpf: true, phone: true, role: true, createdAt: true },
  })
})
