function generateSlots(start: string, end: string, duration: number): string[] {
  const slots: string[] = []
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  let current = sh * 60 + sm
  const endMin = eh * 60 + em

  while (current + duration <= endMin) {
    const h = Math.floor(current / 60).toString().padStart(2, '0')
    const m = (current % 60).toString().padStart(2, '0')
    slots.push(`${h}:${m}`)
    current += duration
  }
  return slots
}

export default defineEventHandler(async (event) => {
  const { companyId, serviceId, date } = getQuery(event)
  if (!companyId || !serviceId || !date) {
    throw createError({ statusCode: 400, statusMessage: 'companyId, serviceId e date são obrigatórios' })
  }

  const targetDate = new Date(String(date))
  const dayOfWeek = targetDate.getUTCDay()

  const [schedule, service] = await Promise.all([
    prisma.schedule.findUnique({
      where: { companyId_dayOfWeek: { companyId: String(companyId), dayOfWeek } },
    }),
    prisma.service.findUnique({ where: { id: String(serviceId) } }),
  ])

  if (!schedule || !schedule.isActive || !service) return []

  const allSlots = generateSlots(schedule.startTime, schedule.endTime, service.duration)

  const booked = await prisma.appointment.findMany({
    where: {
      companyId: String(companyId),
      date: targetDate,
      status: { not: 'CANCELLED' },
    },
    select: { startTime: true },
  })

  const bookedTimes = new Set(booked.map((a) => a.startTime))
  return allSlots.filter((s) => !bookedTimes.has(s))
})
