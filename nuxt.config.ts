import { quasarOptions } from './quasar-options'

export default defineNuxtConfig({
  modules: ['nuxt-quasar-ui'],

  quasar: quasarOptions,

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  devtools: {
    enabled: true,
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-07-08',

  runtimeConfig: {
    betterAuthSecret: process.env.BETTER_AUTH_SECRET || '',
    databaseUrl: process.env.DATABASE_URL || '',
    resendApiKey: process.env.RESEND_API_KEY || '',

    public: {
      cartoApiKey:
        process.env.NUXT_PUBLIC_CARTO_API_KEY || '',
    },
  },

  css: ['~/assets/styles/main.scss'],

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
  },

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png',
        },
      ],
    },
  },
})