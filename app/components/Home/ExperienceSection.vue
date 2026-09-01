<script setup lang="ts">
import ExperienceCard from './ExperienceCard.vue'

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
  if (process.client) {
    if (window.innerWidth < 600) {
      return 'dense'
    }

    if (window.innerWidth < 1024) {
      return 'comfortable'
    }
  }

  return 'loose'
})
</script>

<template>
  <q-section
    id="experiencia"
    class="q-py-xl"
  >
    <div class="wrapper">
      <!-- Cabeçalho -->
      <div class="q-mb-xl">
        <div class="text-overline text-primary text-weight-bold">
          Minha trajetória
        </div>

        <div class="text-h3 text-weight-bold">
          Experiência profissional
        </div>

        <div class="text-body1 text-grey-7 q-mt-md">
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
  </q-section>
</template>