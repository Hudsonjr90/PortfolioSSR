import { z } from 'zod'
import { prisma } from '~/server/utils/prisma'
import { requireRole } from '~/server/utils/session'

const scheduleSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  slotDuration: z.number().int().positive(),
  isActive: z.boolean(),
})

const schema = z.object({
  companyId: z.string(),
  schedules: z.array(scheduleSchema),
})

export default defineEventHandler(async (event) => {
  const session = await requireRole(event, ['ADVERTISER', 'ADMIN'])
  const body = await readBody(event)
  const { companyId, schedules } = schema.parse(body)

  const company = await prisma.company.findUnique({ where: { id: companyId } })
  if (!company) {
    throw createError({ statusCode: 404, statusMessage: 'Empresa não encontrada' })
  }

  const userRole = (session.user as { role?: string }).role
  if (userRole !== 'ADMIN' && company.ownerId !== session.user.id) {
    throw createError({ statusCode: 403, statusMessage: 'Sem permissão' })
  }

  await prisma.$transaction(
    schedules.map((s) =>
      prisma.schedule.upsert({
        where: { companyId_dayOfWeek: { companyId, dayOfWeek: s.dayOfWeek } },
        create: { ...s, companyId },
        update: s,
      }),
    ),
  )

  return prisma.schedule.findMany({ where: { companyId }, orderBy: { dayOfWeek: 'asc' } })
})
