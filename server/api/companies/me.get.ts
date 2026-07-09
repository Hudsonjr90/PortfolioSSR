import { prisma } from '~/server/utils/prisma'
import { requireSession } from '~/server/utils/session'

export default defineEventHandler(async (event) => {
  const session = await requireSession(event)

  const company = await prisma.company.findUnique({
    where: { ownerId: session.user.id },
    include: {
      services: { where: { isActive: true }, orderBy: { name: 'asc' } },
      schedules: { orderBy: { dayOfWeek: 'asc' } },
    },
  })

  if (!company) {
    throw createError({ statusCode: 404, statusMessage: 'Nenhuma empresa encontrada' })
  }

  const { evolutionApiUrl, evolutionApiToken, evolutionApiInstance, ...safe } = company
  return { ...safe, hasEvolutionApi: !!evolutionApiUrl }
})
