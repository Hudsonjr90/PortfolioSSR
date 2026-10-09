import { TechnologyCategory, TechnologyLevel } from '@prisma/client'
import { createError, readBody, type H3Event } from 'h3'
import { z } from 'zod'

const optionalText = z.string().trim().max(2000).nullable()
const sortOrder = z.number().int().min(0).max(100000)
const dateInput = z
  .string()
  .trim()
  .min(1)
  .refine((value) => !Number.isNaN(new Date(value).getTime()), 'Invalid date')

export const educationInputSchema = z.object({
  institution: z.string().trim().min(1).max(200),
  course: z.string().trim().min(1).max(200),
  description: z.string().max(10000).nullable(),
  startDate: dateInput.nullable(),
  endDate: dateInput.nullable(),
  logoUrl: optionalText,
  sortOrder,
})

export const experienceInputSchema = z.object({
  company: z.string().trim().min(1).max(200),
  role: z.string().trim().min(1).max(200),
  description: z.string().max(10000),
  startDate: dateInput,
  endDate: dateInput.nullable(),
  isCurrent: z.boolean(),
  logoUrl: optionalText,
  sortOrder,
  technologyIds: z.array(z.string().min(1).max(100)).max(100),
})

export const testimonialInputSchema = z.object({
  experienceId: z.string().min(1).max(100),
  name: z.string().trim().min(1).max(160),
  role: optionalText,
  company: optionalText,
  content: z.string().trim().min(1).max(10000),
  avatarUrl: optionalText,
  sortOrder,
})

export const technologyInputSchema = z.object({
  name: z.string().trim().min(1).max(100),
  category: z.nativeEnum(TechnologyCategory),
  icon: optionalText,
  sortOrder,
  featured: z.boolean(),
  level: z.nativeEnum(TechnologyLevel),
})

export async function readAdminRecordBody<T extends z.ZodTypeAny>(
  event: H3Event,
  schema: T,
): Promise<z.infer<T>> {
  const body: unknown = await readBody(event)
  const result = schema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request data',
      data: result.error.flatten(),
    })
  }

  return result.data
}

export function toDate(value: string | null) {
  return value === null ? null : new Date(value)
}
