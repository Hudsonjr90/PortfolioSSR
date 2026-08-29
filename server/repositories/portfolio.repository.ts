import { prisma } from '../utils/prisma'

export async function findPortfolio() {
  return prisma.profile.findFirst({
    include: {
      experiences: {
        orderBy: {
          sortOrder: 'asc',
        },
        include: {
          technologies: {
            include: {
              technology: true,
            },
          },
          testimonials: {
            orderBy: {
              sortOrder: 'asc',
            },
          },
        },
      },

      education: {
        orderBy: {
          sortOrder: 'asc',
        },
      },

      certifications: {
        orderBy: {
          sortOrder: 'asc',
        },
      },

      socialLinks: {
        orderBy: {
          sortOrder: 'asc',
        },
      },
    },
  })
}