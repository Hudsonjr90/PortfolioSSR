export interface PortfolioProfile {
  id: string
  name: string
  headline: string
  shortBio: string
  about: string
  location: string | null
  avatarUrl: string | null
  resumeUrl: string | null
  email: string | null
}

export interface PortfolioTechnology {
  id: string
  name: string
  category: string
  icon: string | null
  sortOrder: number
  featured: boolean
  level: string
}

export interface PortfolioTestimonial {
  id: string
  name: string
  role: string | null
  company: string | null
  content: string
  avatarUrl: string | null
  sortOrder: number
}

export interface PortfolioExperience {
  id: string
  company: string
  role: string
  description: string
  startDate: string
  endDate: string | null
  isCurrent: boolean
  logoUrl: string | null
  sortOrder: number
  technologies: PortfolioTechnology[]
  testimonials: PortfolioTestimonial[]
}

export interface PortfolioEducation {
  id: string
  institution: string
  course: string
  description: string | null
  startDate: string | null
  endDate: string | null
  logoUrl: string | null
  sortOrder: number
}

export interface PortfolioCertification {
  id: string
  name: string
  issuer: string
  issuedAt: string | null
  credentialUrl: string | null
  sortOrder: number
}

export interface PortfolioSocialLink {
  id: string
  platform: string
  label: string
  url: string
  icon: string | null
  sortOrder: number
}

export interface Portfolio {
  profile: PortfolioProfile
  experiences: PortfolioExperience[]
  technologies: PortfolioTechnology[]
  education: PortfolioEducation[]
  certifications: PortfolioCertification[]
  socialLinks: PortfolioSocialLink[]
}

export function usePortfolio() {
  return useFetch<Portfolio>('/api/portfolio', {
    key: 'portfolio',
    server: true,
    lazy: false,
  })
}