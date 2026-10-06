export interface ProjectRecord {
  id: string
  slug: string
  name: string
  category: string | null
  subtitle: string | null
  description: string
  icon: string | null
  image: string
  previewGif: string | null
  technologies: string[]
  url: string | null
  github: string | null
  sortOrder: number
  isPublished: boolean
}

export type ProjectInput = Omit<ProjectRecord, 'id'>
