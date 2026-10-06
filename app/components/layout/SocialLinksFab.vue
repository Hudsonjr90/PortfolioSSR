<template>
  <q-fab
    flat
    :direction="props.direction"
    icon="mdi-share-variant-outline"
    aria-label="Abrir redes sociais"
  >
    <q-fab-action
      v-if="githubUrl"
      icon="mdi-github"
      aria-label="GitHub"
      :href="githubUrl"
      target="_blank"
      rel="noopener noreferrer"
      @click="handleClickBtn('github')"
    />
    <q-fab-action
      v-if="linkedinUrl"
      icon="mdi-linkedin"
      aria-label="LinkedIn"
      :href="linkedinUrl"
      target="_blank"
      rel="noopener noreferrer"
      @click="handleClickBtn('linkedin')"
    />
    <q-fab-action
      v-if="whatsappUrl"
      icon="mdi-whatsapp"
      aria-label="WhatsApp"
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      @click="handleClickBtn('whatsapp')"
    />
    <q-fab-action
      icon="mdi-email"
      aria-label="Enviar e-mail"
      :href="emailHref"
      target="_blank"
      @click="handleClickBtn('emailHref')"
    />
  </q-fab>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    direction?: 'up' | 'down' | 'left' | 'right'
  }>(),
  {
    direction: 'right',
  },
)

const { data: portfolio } = usePortfolio()

const emailHref =
  'mailto:hudsonhugo90@gmail.com?subject=Contato%20pelo%20Portf%C3%B3lio&body=Ol%C3%A1%20Hudson%2C%20podemos%20conversar%3F'

const socialLinks = computed(() => {
  return [...(portfolio.value?.socialLinks ?? [])].sort(
    (first, second) => (first.sortOrder ?? 0) - (second.sortOrder ?? 0),
  )
})

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function findSocialUrl(platform: string) {
  const normalizedPlatform = normalize(platform)

  return (
    socialLinks.value.find((item) => normalize(item.platform) === normalizedPlatform)?.url ?? ''
  )
}

const githubUrl = computed(() => findSocialUrl('github'))
const linkedinUrl = computed(() => findSocialUrl('linkedin'))
const whatsappUrl = computed(() => findSocialUrl('whatsapp'))

const handleClickBtn = (platform: string) => {
  const url = findSocialUrl(platform)

  if (url) {
    window.open(url, '_blank')
  }
}
</script>
