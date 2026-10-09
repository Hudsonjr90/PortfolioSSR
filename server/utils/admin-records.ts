import { createError } from 'h3'
import { prisma } from './prisma'

export async function requireProfileId() {
  const profile = await prisma.profile.findFirst({ select: { id: true } })

  if (!profile) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Create a profile before adding education or experience.',
    })
  }

  return profile.id
}

export async function requireExperience(experienceId: string) {
  const experience = await prisma.experience.findUnique({
    where: { id: experienceId },
    select: { id: true },
  })

  if (!experience) {
    throw createError({ statusCode: 400, statusMessage: 'Experience not found' })
  }
}

export async function validateTechnologyIds(technologyIds: string[]) {
  const technologies = await prisma.technology.findMany({
    where: { id: { in: technologyIds } },
    select: { id: true },
  })

  if (technologies.length !== new Set(technologyIds).size) {
    throw createError({ statusCode: 400, statusMessage: 'One or more technologies were not found' })
  }

  return [...new Set(technologyIds)]
}

export function throwAdminRecordError(error: unknown, noun: string): never {
  if (error && typeof error === 'object' && 'code' in error) {
    if (error.code === 'P2025') {
      throw createError({ statusCode: 404, statusMessage: `${noun} not found` })
    }

    if (error.code === 'P2002') {
      throw createError({ statusCode: 409, statusMessage: `${noun} already exists` })
    }
  }

  throw error
}
