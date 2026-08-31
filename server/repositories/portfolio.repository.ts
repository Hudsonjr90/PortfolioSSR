import { prisma } from '../utils/prisma'

export async function findPortfolio() {
  const [profile, technologies] = await Promise.all([
    prisma.profile.findFirst({
      include: {
        experiences: {
          orderBy: {
            sortOrder: 'asc',
          },
          include: {
            technologies: {
              orderBy: {
                technology: {
                  sortOrder: 'asc',
                },
              },
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
    }),

    prisma.technology.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
    }),
  ])

  return {
    profile,
    technologies,
  }
}