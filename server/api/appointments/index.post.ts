import { z } from 'zod'
import { prisma } from '~/server/utils/prisma'
import { requireSession } from '~/server/utils/session'
import { sendAppointmentConfirmation } from '~/server/utils/notifications/email'
import { sendWhatsAppMessage, buildAppointmentMessage } from '~/server/utils/notifications/whatsapp'

const schema = z.object({
  companyId: z.string(),
  serviceId: z.string(),
  date: z.string(),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  notes: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const session = await requireSession(event)
  const body = await readBody(event)
  const data = schema.parse(body)

  const [company, service] = await Promise.all([
    prisma.company.findUnique({ where: { id: data.companyId } }),
    prisma.service.findUnique({ where: { id: data.serviceId } }),
  ])

  if (!company || !service) {
    throw createError({ statusCode: 404, statusMessage: 'Empresa ou serviço não encontrado' })
  }

  const targetDate = new Date(data.date)
  const [sh, sm] = data.startTime.split(':').map(Number)
  const endMin = sh * 60 + sm + service.duration
  const endTime = `${Math.floor(endMin / 60).toString().padStart(2, '0')}:${(endMin % 60).toString().padStart(2, '0')}`

  const conflict = await prisma.appointment.findFirst({
    where: {
      companyId: data.companyId,
      date: targetDate,
      startTime: data.startTime,
      status: { not: 'CANCELLED' },
    },
  })
  if (conflict) {
    throw createError({ statusCode: 409, statusMessage: 'Horário indisponível' })
  }

  const appointment = await prisma.appointment.create({
    data: {
      companyId: data.companyId,
      serviceId: data.serviceId,
      clientId: session.user.id,
      date: targetDate,
      startTime: data.startTime,
      endTime,
      notes: data.notes,
      status: 'CONFIRMED',
    },
    include: {
      client: true,
      service: true,
      company: true,
    },
  })

  const dateFormatted = targetDate.toLocaleDateString('pt-BR')

  sendAppointmentConfirmation({
    clientName: appointment.client.name,
    clientEmail: appointment.client.email,
    companyName: company.name,
    serviceName: service.name,
    date: dateFormatted,
    startTime: data.startTime,
    endTime,
  }).catch(() => {})

  if (company.evolutionApiUrl && company.evolutionApiToken && company.evolutionApiInstance) {
    const clientPhone = (session.user as { phone?: string }).phone
    if (clientPhone) {
      sendWhatsAppMessage(
        {
          apiUrl: company.evolutionApiUrl,
          apiToken: company.evolutionApiToken,
          instanceName: company.evolutionApiInstance,
        },
        {
          phone: clientPhone,
          message: buildAppointmentMessage(
            appointment.client.name,
            company.name,
            service.name,
            dateFormatted,
            data.startTime,
          ),
        },
      ).catch(() => {})
    }
  }

  return appointment
})
