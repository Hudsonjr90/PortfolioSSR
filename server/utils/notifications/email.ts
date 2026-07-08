import { Resend } from 'resend'

let resend: Resend | null = null

function getResend() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) return null
    resend = new Resend(apiKey)
  }
  return resend
}

interface AppointmentEmailData {
  clientName: string
  clientEmail: string
  companyName: string
  serviceName: string
  date: string
  startTime: string
  endTime: string
}

export async function sendAppointmentConfirmation(data: AppointmentEmailData) {
  const client = getResend()
  if (!client) return

  await client.emails.send({
    from: 'AgendAI <no-reply@agendai.app>',
    to: data.clientEmail,
    subject: `Agendamento confirmado — ${data.companyName}`,
    html: `
      <h2>Olá, ${data.clientName}!</h2>
      <p>Seu agendamento foi confirmado.</p>
      <ul>
        <li><strong>Empresa:</strong> ${data.companyName}</li>
        <li><strong>Serviço:</strong> ${data.serviceName}</li>
        <li><strong>Data:</strong> ${data.date}</li>
        <li><strong>Horário:</strong> ${data.startTime} — ${data.endTime}</li>
      </ul>
      <p>Em caso de dúvidas ou necessidade de cancelamento, entre em contato com a empresa.</p>
    `,
  })
}

export async function sendAppointmentCancellation(data: AppointmentEmailData) {
  const client = getResend()
  if (!client) return

  await client.emails.send({
    from: 'AgendAI <no-reply@agendai.app>',
    to: data.clientEmail,
    subject: `Agendamento cancelado — ${data.companyName}`,
    html: `
      <h2>Olá, ${data.clientName}!</h2>
      <p>Seu agendamento foi cancelado.</p>
      <ul>
        <li><strong>Empresa:</strong> ${data.companyName}</li>
        <li><strong>Serviço:</strong> ${data.serviceName}</li>
        <li><strong>Data:</strong> ${data.date}</li>
        <li><strong>Horário:</strong> ${data.startTime} — ${data.endTime}</li>
      </ul>
    `,
  })
}
