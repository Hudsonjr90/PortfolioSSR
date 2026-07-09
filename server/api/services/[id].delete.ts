export default defineEventHandler(async (event) => {
  const session = await requireRole(event, ['ADVERTISER', 'ADMIN'])
  const id = getRouterParam(event, 'id')!

  const service = await prisma.service.findUnique({ where: { id }, include: { company: true } })
  if (!service) {
    throw createError({ statusCode: 404, statusMessage: 'Serviço não encontrado' })
  }

  const userRole = (session.user as { role?: string }).role
  if (userRole !== 'ADMIN' && service.company.ownerId !== session.user.id) {
    throw createError({ statusCode: 403, statusMessage: 'Sem permissão' })
  }

  await prisma.service.update({ where: { id }, data: { isActive: false } })
  return { success: true }
})
