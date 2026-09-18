<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'pt-BR',
  },
  meta: [
    { name: 'theme-color', content: '#070B14' },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'preload', href: '/fonts/Inter.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
  ],
})
</script>