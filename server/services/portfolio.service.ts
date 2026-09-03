import { findPortfolio } from '../repositories/portfolio.repository'

export async function getPortfolio() {
  const data = await findPortfolio()

  if (!data.profile) {
    return null
  }

  const {
    id,
    name,
    headline,
    shortBio,
    about,
    location,
    email,
  } = data.profile

  return {
    profile: {
      id,
      name,
      headline,
      shortBio,
      about,
      location,
      email,
    },

    experiences: data.profile.experiences.map((experience) => ({
      id: experience.id,
      company: experience.company,
      role: experience.role,
      description: experience.description,
      startDate: experience.startDate,
      endDate: experience.endDate,
      isCurrent: experience.isCurrent,
      logoUrl: experience.logoUrl,
      sortOrder: experience.sortOrder,

      technologies: experience.technologies.map(
        ({ technology }) => ({
          id: technology.id,
          name: technology.name,
          category: technology.category,
          icon: technology.icon,
          sortOrder: technology.sortOrder,
          featured: technology.featured,
        }),
      ),

      testimonials: experience.testimonials.map((testimonial) => ({
        id: testimonial.id,
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company,
        content: testimonial.content,
        avatarUrl: testimonial.avatarUrl,
        sortOrder: testimonial.sortOrder,
      })),
    })),

    technologies: data.technologies.map((technology) => ({
      id: technology.id,
      name: technology.name,
      category: technology.category,
      icon: technology.icon,
      sortOrder: technology.sortOrder,
      featured: technology.featured,
      level: technology.level,
    })),

    education: data.profile.education.map((education) => ({
      id: education.id,
      institution: education.institution,
      course: education.course,
      description: education.description,
      startDate: education.startDate,
      endDate: education.endDate,
      logoUrl: education.logoUrl,
      sortOrder: education.sortOrder,
    })),

    certifications: data.profile.certifications.map((certification) => ({
      id: certification.id,
      name: certification.name,
      issuer: certification.issuer,
      issuedAt: certification.issuedAt,
      credentialUrl: certification.credentialUrl,
      sortOrder: certification.sortOrder,
    })),

    socialLinks: data.profile.socialLinks.map((socialLink) => ({
      id: socialLink.id,
      platform: socialLink.platform,
      label: socialLink.label,
      url: socialLink.url,
      icon: socialLink.icon,
      sortOrder: socialLink.sortOrder,
    })),
  }
}