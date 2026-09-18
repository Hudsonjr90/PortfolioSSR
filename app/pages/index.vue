<template>
  <q-layout view="hHh lpR fFf">
    <AppNavbar />

    <q-page-container
      class="q-mb-md container-style"
      :class="{
        'container-style--dark': isDark,
      }"
      style="padding-top: 30px"
    >
      <q-page style="min-height: calc(100vh - 30px)">
        <main>
          <CursorEffect />

          <AboutSection />

          <div class="wrapper q-my-xl">
            <q-separator color="grey-8" />
          </div>

          <EducationSection />

          <div class="wrapper q-my-xl">
            <q-separator color="grey-8" />
          </div>

          <ExperienceSection />

          <div class="wrapper q-my-xl">
            <q-separator color="grey-8" />
          </div>

          <TestimonialSection />

          <div class="wrapper q-my-xl">
            <q-separator color="grey-8" />
          </div>

          <TechnologySection />

          <div class="wrapper q-my-xl">
            <q-separator color="grey-8" />
          </div>

          <ContactSection class="contact-separation" />
        </main>
      </q-page>
    </q-page-container>

    <AppFooter />

    <ScrollToTop />
  </q-layout>
</template>

<script setup lang="ts">
const isDark = useTheme().isDark

const siteUrl = 'https://hudsonkennedy.dev.br'
const canonicalUrl = `${siteUrl}/`

const title = 'Hudson Kennedy | Desenvolvedor Full Stack'

const description =
  'Desenvolvedor Full Stack com foco em arquitetura de software, engenharia de software, banco de dados e de aplicações web e soluções com IA.'

const ogImage = `${siteUrl}/logo.png`

useSeoMeta({
  title,
  description,
  keywords:
    'Desenvolvedor Full Stack, JavaScript, TypeScript, Vue.js, Nuxt, React, Node.js, Arquitetura de Software, Microsserviços, IA',
  author: 'Hudson Kennedy',
  charset: 'UTF-8',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: canonicalUrl,
  ogImage,
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageType: 'image/png',
  ogImageAlt: 'Hudson Kennedy - Desenvolvedor Full Stack',
  ogLocale: 'pt_BR',
  ogSiteName: 'Hudson Kennedy | Desenvolvedor Full Stack',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
  twitterImageAlt: 'Hudson Kennedy - Desenvolvedor Full Stack',
})

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Hudson Kennedy',
      url: canonicalUrl,
      jobTitle: 'Desenvolvedor Full Stack',
      sameAs: ['https://github.com/Hudsonjr90', 'https://www.linkedin.com/in/hudsonkennedyjr/'],
      knowsAbout: [
        'JavaScript',
        'TypeScript',
        'Vue.js',
        'Nuxt',
        'React',
        'Angular',
        'Svelte',
        'Quasar',
        'Node.js',
        'NestJS',
        'Express',
        'Fastify',
        'Prisma',
        'PostgreSQL',
        'Docker',
        'AWS',
        'Arquitetura de Software',
        'Microsserviços',
        'Desenvolvimento Full Stack',
        'IA',
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BR',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: canonicalUrl,
      name: 'Hudson Kennedy',
      description,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profilepage`,
      url: canonicalUrl,
      name: title,
      description,
      inLanguage: 'pt-BR',
      mainEntity: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: canonicalUrl,
        },
      ],
    },
  ],
}

useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl },
    { rel: 'alternate', hreflang: 'pt-BR', href: canonicalUrl },
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'preconnect', href: 'https://github.com' },
    { rel: 'preconnect', href: 'https://www.linkedin.com' },
    { rel: 'preload', href: '/fonts/Inter.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData),
    },
  ],
  meta: [{ name: 'theme-color', content: '#ffffff' }],
})
</script>

<style scoped>
.container-style {
  position: relative;

  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.18) 1.3px, transparent 1.3px);

  background-size: 42px 42px;
}

.container-style--dark {
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.18) 1.3px, transparent 1.3px);
}
</style>
