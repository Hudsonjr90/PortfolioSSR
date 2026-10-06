import { createError, readBody, type H3Event } from 'h3'
import { z } from 'zod'

const optionalText = z.string().trim().max(2000).nullable()

export const projectInputSchema = z.object({
  slug: z.string().trim().min(1).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(1).max(160),
  category: optionalText,
  subtitle: optionalText,
  description: z.string().max(10000),
  icon: optionalText,
  image: z.string().trim().min(1).max(2000),
  previewGif: optionalText,
  technologies: z.array(z.string().trim().min(1).max(80)).max(40),
  url: optionalText,
  github: optionalText,
  sortOrder: z.number().int().min(0).max(100000),
  isPublished: z.boolean(),
})

export async function readProjectInput(event: H3Event) {
  const body: unknown = await readBody(event)
  const result = projectInputSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid project data',
      data: result.error.flatten(),
    })
  }

  return result.data
}
