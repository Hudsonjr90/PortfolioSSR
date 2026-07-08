interface EvolutionConfig {
  apiUrl: string
  apiToken: string
  instanceName: string
}

interface WhatsAppMessageData {
  phone: string
  message: string
}

export async function sendWhatsAppMessage(config: EvolutionConfig, data: WhatsAppMessageData) {
  if (!config.apiUrl || !config.apiToken || !config.instanceName) return

  const number = data.phone.replace(/\D/g, '')

  await $fetch(`${config.apiUrl}/message/sendText/${config.instanceName}`, {
    method: 'POST',
    headers: {
      apikey: config.apiToken,
      'Content-Type': 'application/json',
    },
    body: {
      number,
      text: data.message,
    },
  })
}

export function buildAppointmentMessage(
  clientName: string,
  companyName: string,
  serviceName: string,
  date: string,
  startTime: string,
) {
  return (
    `Olá, ${clientName}! 👋\n\n` +
    `Seu agendamento na *${companyName}* foi confirmado.\n\n` +
    `📋 *Serviço:* ${serviceName}\n` +
    `📅 *Data:* ${date}\n` +
    `🕐 *Horário:* ${startTime}\n\n` +
    `Até lá!`
  )
}
