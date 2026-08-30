import type { ModuleOptions } from 'nuxt-quasar-ui'

export const quasarOptions: ModuleOptions = {
  sassVariables: '@/assets/styles/quasar-variable.scss',

  plugins: [
    'Dialog',
    'Loading',
    'LoadingBar',
    'Notify',
    'Dark',
  ],

  iconSet: 'mdi-v7',

  components: {
    defaults: {
      QBtn: {
        unelevated: true,
        noCaps: true,
      },
    },
  },

  extras: {
    fontIcons: [
      'mdi-v7',
    ],
  },

  config: {
    loading: {
      message: 'Carregando...',
      spinnerColor: 'primary',
    },

    notify: {
      position: 'top',
      timeout: 2500,
    },
  },
}