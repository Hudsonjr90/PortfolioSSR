export default defineEventHandler(async (event) => {
  const session = await requireSession(event)
  const { companyId, date, status } = getQuery(event)
  const userRole = (session.user as { role?: string }).role

  const where: Record<string, unknown> = {}

  if (userRole === 'CLIENT') {
    where.clientId = session.user.id
  }
  else if (userRole === 'ADVERTISER') {
    const company = await prisma.company.findUnique({ where: { ownerId: session.user.id } })
    if (!company) return []
    where.companyId = company.id
  }

  if (companyId && userRole === 'ADMIN') where.companyId = String(companyId)
  if (date) where.date = new Date(String(date))
  if (status) where.status = String(status)

  return prisma.appointment.findMany({
    where,
    include: {
      client: { select: { id: true, name: true, email: true, phone: true } },
      service: { select: { id: true, name: true, duration: true, price: true } },
      company: { select: { id: true, name: true, slug: true } },
    },
    orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
  })
})
