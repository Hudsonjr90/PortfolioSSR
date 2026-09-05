<script setup lang="ts">
import { onMounted, ref } from 'vue'

import ExperienceCard from './ExperienceCard.vue'

const { isMobile, timelineLayout } = useMobile()
const isHydrated = ref(false)

const { data: portfolio } = usePortfolio()

const sortedExperiences = computed(() => {
  const list = [...(portfolio.value?.experiences ?? [])]

  return list.sort((a, b) => {
    if (a.isCurrent !== b.isCurrent) {
      return a.isCurrent ? -1 : 1
    }

    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  })
})

const INITIAL_COUNT = 3
const expanded = ref(false)

const visibleExperiences = computed(() => {
  if (expanded.value) {
    return sortedExperiences.value
  }

  return sortedExperiences.value.slice(0, INITIAL_COUNT)
})

const layout = computed(() => {
  if (!isHydrated.value) {
    return 'loose'
  }

  return timelineLayout.value
})

onMounted(() => {
  isHydrated.value = true
})
</script>

<template>
  <section
    id="experiencia"
    class="q-py-xl"
  >
    <div class="wrapper">
      <!-- Cabeçalho -->
      <div class="q-mb-xl">
        <div class="text-overline text-primary text-weight-bold">
          Minha trajetória
        </div>

        <div class="text-weight-bold" :class="isMobile ? 'text-h4' : 'text-h3'">
          Experiência profissional
        </div>

        <div class="text-body1 q-mt-md">
          Uma trajetória construída através de diferentes desafios,
          produtos e experiências de desenvolvimento.
        </div>
      </div>

      <!-- Timeline -->
      <q-timeline
        :layout="layout"
        color="primary"
      >
        <ExperienceCard
          v-for="experience in visibleExperiences"
          :key="experience.id"
          :experience="experience"
        />
      </q-timeline>

      <div class="text-center q-mt-xl">
        <q-btn
          v-if="sortedExperiences.length > INITIAL_COUNT"
          outline
          color="primary"
          :label="expanded ? 'Ver menos' : 'Ver mais'"
          :icon-right="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="expanded = !expanded"
        />
      </div>
    </div>
  </section>
</template>