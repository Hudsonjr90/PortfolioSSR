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
            <q-separator
              color="grey-8"
              class="q-mb-xs q-mt-xs"
            />
          </div>

          <EducationSection />

          <div class="wrapper q-my-xl">
            <q-separator
              color="grey-8"
              class="q-mb-xs q-mt-xs"
            />
          </div>

          <ExperienceSection />

          <div class="wrapper q-my-xl">
            <q-separator
              color="grey-8"
              class="q-mb-xs q-mt-xs"
            />
          </div>

          <TestimonialSection />

          <div class="wrapper q-my-xl">
            <q-separator
              color="grey-8"
              class="q-mb-xs q-mt-xs"
            />
          </div>

          <TechnologySection />

          <div class="wrapper q-my-xl">
            <q-separator
              color="grey-8"
              class="q-mb-xs q-mt-xs"
            />
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

const siteUrl = 'https://www.hudsonkennedy.dev.br'
const canonicalUrl = `${siteUrl}/`

const title = 'Hudson Kennedy | Desenvolvedor Full Stack'

const description =
  'Desenvolvedor Full Stack especializado em Frontend, Backend, Banco de dados e arquitetura de software.'

const ogImage = `${siteUrl}/og-image.png`

useSeoMeta({
  title,

  description,

  author: 'Hudson Kennedy',

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

      sameAs: [
        'https://github.com/Hudsonjr90',
        'https://www.linkedin.com/in/hudsonkennedyjr/',
      ],

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
      ],
    },

    {
      '@type': 'WebSite',

      '@id': `${siteUrl}/#website`,

      url: canonicalUrl,

      name: 'Hudson Kennedy',

      description,

      inLanguage: 'pt-BR',

      publisher: {
        '@id': `${siteUrl}/#person`,
      },
    },

    {
      '@type': 'ProfilePage',

      '@id': `${siteUrl}/#profilepage`,

      url: canonicalUrl,

      name: title,

      description,

      inLanguage: 'pt-BR',

      mainEntity: {
        '@id': `${siteUrl}/#person`,
      },
    },
  ],
}

useHead({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl,
    },
  ],

  script: [
    {
      type: 'application/ld+json',

      innerHTML: JSON.stringify(structuredData),
    },
  ],
})
</script>

<style scoped>
.container-style {
  position: relative;

  background-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.18) 1.3px,
    transparent 1.3px
  );

  background-size: 42px 42px;
}

.container-style--dark {
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.18) 1.3px,
    transparent 1.3px
  );
}
</style>