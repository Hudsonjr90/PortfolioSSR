import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  return prisma.company.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      logo: true,
      description: true,
      phone: true,
      whatsapp: true,
      instagram: true,
      facebook: true,
      address: true,
    },
    orderBy: { name: 'asc' },
  })
})
