import { z } from 'zod'
import { sendAppointmentCancellation } from '../../utils/notifications/email'

const schema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
  notes: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const session = await requireSession(event)
  const id = getRouterParam(event, 'id')!
  const body = await readBody(event)
  const data = schema.parse(body)

  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: { client: true, service: true, company: true },
  })
  if (!appointment) {
    throw createError({ statusCode: 404, statusMessage: 'Agendamento não encontrado' })
  }

  const userRole = (session.user as { role?: string }).role
  const isOwner = appointment.company.ownerId === session.user.id
  const isClient = appointment.clientId === session.user.id

  if (userRole !== 'ADMIN' && !isOwner && !isClient) {
    throw createError({ statusCode: 403, statusMessage: 'Sem permissão' })
  }

  if (isClient && !isOwner && userRole !== 'ADMIN' && data.status !== 'CANCELLED') {
    throw createError({ statusCode: 403, statusMessage: 'Clientes só podem cancelar agendamentos' })
  }

  const updated = await prisma.appointment.update({ where: { id }, data })

  if (data.status === 'CANCELLED') {
    sendAppointmentCancellation({
      clientName: appointment.client.name,
      clientEmail: appointment.client.email,
      companyName: appointment.company.name,
      serviceName: appointment.service.name,
      date: appointment.date.toLocaleDateString('pt-BR'),
      startTime: appointment.startTime,
      endTime: appointment.endTime,
    }).catch(() => {})
  }

  return updated
})
