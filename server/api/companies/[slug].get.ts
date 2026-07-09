export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!

  const company = await prisma.company.findUnique({
    where: { slug },
    include: {
      services: { where: { isActive: true }, orderBy: { name: 'asc' } },
      schedules: { where: { isActive: true }, orderBy: { dayOfWeek: 'asc' } },
      owner: { select: { name: true, email: true } },
    },
  })

  if (!company) {
    throw createError({ statusCode: 404, statusMessage: 'Empresa não encontrada' })
  }

  const { evolutionApiUrl, evolutionApiToken, evolutionApiInstance, ...safe } = company
  return safe
})
