export interface AdminEducation {
  id: string
  institution: string
  course: string
  description: string | null
  startDate: string | null
  endDate: string | null
  logoUrl: string | null
  sortOrder: number
}

export interface AdminTechnology {
  id: string
  name: string
  category: TechnologyCategory
  icon: string | null
  sortOrder: number
  featured: boolean
  level: TechnologyLevel
  experiences?: Array<{ experienceId: string }>
}

export type TechnologyCategory =
  | 'FRONTEND'
  | 'BACKEND'
  | 'DATABASE'
  | 'DEVOPS'
  | 'TESTING'
  | 'OTHER'
  | 'DESIGN'
  | 'AI'

export type TechnologyLevel = 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'ESPECIALIST'

export interface AdminExperience {
  id: string
  company: string
  role: string
  description: string
  startDate: string
  endDate: string | null
  isCurrent: boolean
  logoUrl: string | null
  sortOrder: number
  technologies: Array<{ technology: AdminTechnology }>
  testimonials?: Array<{ id: string }>
}

export interface AdminTestimonial {
  id: string
  experienceId: string
  name: string
  role: string | null
  company: string | null
  content: string
  avatarUrl: string | null
  sortOrder: number
  experience: { id: string; company: string; role: string }
}
