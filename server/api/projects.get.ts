import { defineEventHandler } from 'h3'
import { prisma } from '../utils/prisma'

export default defineEventHandler(() =>
  prisma.project.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    select: {
      id: true,
      slug: true,
      name: true,
      category: true,
      subtitle: true,
      description: true,
      icon: true,
      image: true,
      previewGif: true,
      technologies: true,
      url: true,
      github: true,
      sortOrder: true,
      isPublished: true,
    },
  }),
)
