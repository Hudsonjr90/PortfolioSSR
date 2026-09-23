
interface SeoOptions {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
  ogImageAlt?: string
  structuredData?: Record<string, any>
}

export const useSeo = (options: SeoOptions) => {
  const siteUrl = 'https://hudsonkennedy.dev.br'
  const defaultOgImage = `${siteUrl}/og-image.png`
  const defaultOgImageAlt = 'Hudson Kennedy - Desenvolvedor Full Stack'
  const canonicalUrl = options.canonicalUrl || `${siteUrl}/`
  const ogImage = options.ogImage || defaultOgImage
  const ogImageAlt = options.ogImageAlt || defaultOgImageAlt

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: 'Hudson Kennedy',
        url: siteUrl,
        jobTitle: 'Desenvolvedor Full Stack',
        sameAs: [
          'https://github.com/Hudsonjr90',
          'https://www.linkedin.com/in/hudsonkennedyjr/',
        ],
        knowsAbout: [
          'JavaScript', 'TypeScript', 'Vue.js', 'Nuxt', 'React', 'Angular',
          'Svelte', 'Quasar', 'Node.js', 'NestJS', 'Express', 'Fastify',
          'Prisma', 'PostgreSQL', 'Docker', 'AWS', 'Arquitetura de Software',
          'Microsserviços', 'Desenvolvimento Full Stack', 'IA',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Hudson Kennedy',
        description: options.description,
        inLanguage: 'pt-BR',
        publisher: { '@id': `${siteUrl}/#person` },
      },
    ],
  }

  const structuredData = options.structuredData
    ? { ...defaultStructuredData, ...options.structuredData }
    : defaultStructuredData

  useSeoMeta({
    title: options.title,
    description: options.description,
    author: 'Hudson Kennedy',
    robots: 'index, follow',
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1',
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: 'website',
    ogUrl: canonicalUrl,
    ogImage,
    ogImageWidth: '1200',
    ogImageHeight: '630',
    ogImageType: 'image/png',
    ogImageAlt: ogImageAlt,
    ogLocale: 'pt_BR',
    ogSiteName: 'Hudson Kennedy | Desenvolvedor Full Stack',
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: ogImage,
    twitterImageAlt: ogImageAlt,
  })

  // Aplica as tags no <head>
  useHead({
    htmlAttrs: {
      lang: 'pt-BR',
    },
    link: [
      { rel: 'canonical', href: canonicalUrl },
      { rel: 'alternate', hreflang: 'pt-BR', href: canonicalUrl },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      { rel: 'preconnect', href: 'https://github.com' },
      { rel: 'preconnect', href: 'https://www.linkedin.com' },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(structuredData),
      },
    ],
  })
}