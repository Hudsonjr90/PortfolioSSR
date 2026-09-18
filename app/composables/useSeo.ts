
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

  // Define a URL canônica (padrão: página inicial)
  const canonicalUrl = options.canonicalUrl || `${siteUrl}/`

  // Define a imagem OG (padrão: logo.png)
  const ogImage = options.ogImage || defaultOgImage
  const ogImageAlt = options.ogImageAlt || defaultOgImageAlt

  // Structured Data padrão (pode ser sobrescrito)
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

  // Mescla o structuredData padrão com o personalizado (se fornecido)
  const structuredData = options.structuredData
    ? { ...defaultStructuredData, ...options.structuredData }
    : defaultStructuredData

  // Aplica as meta tags de SEO
  useSeoMeta({
    title: options.title,
    description: options.description,
    author: 'Hudson Kennedy',
    robots: 'index, follow',
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1',
    // Open Graph
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: 'website',
    ogUrl: canonicalUrl,
    ogImage,
    ogImageWidth: '300',
    ogImageHeight: '300',
    ogImageType: 'image/png',
    ogImageAlt: ogImageAlt,
    ogLocale: 'pt_BR',
    ogSiteName: 'Hudson Kennedy | Desenvolvedor Full Stack',
    // Twitter Card
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
      // Pré-conexões para domínios externos
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