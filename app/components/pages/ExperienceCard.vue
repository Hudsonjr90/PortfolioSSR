<script setup lang="ts">

defineProps<{
  experience: {
    id: string
    company: string
    role: string
    description: string
    startDate: string
    endDate: string | null
    isCurrent: boolean
    technologies: {
      id: string
      name: string
      category: string
      icon: string | null
      sortOrder: number
      featured: boolean
    }[]
  }
}>()

const experienceLogos: Record<string, string> = {
  eterj: '/images/experiences/eterj.png',
  dt3sports: '/images/experiences/dt3.png',
  vilt: '/images/experiences/vilt.png',
  capitona: '/images/experiences/capitona.png',
  atlas: '/images/experiences/atlas.png',
  cast: '/images/experiences/cast.png',
  tdb: '/images/experiences/tdb.png',
  cubo: '/images/experiences/cubo.png',
  afilio: '/images/experiences/afilio.png',
}


function normalizeCompanyName(company: string) {
  return company
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}


function getLogo(company: string) {
  const normalizedCompany = normalizeCompanyName(company)

  if (experienceLogos[normalizedCompany]) {
    return experienceLogos[normalizedCompany]
  }

  const match = Object.entries(experienceLogos).find(([key]) =>
    normalizedCompany.includes(key),
  )

  return match ? match[1] : null
}

function formatDate(date: string | null) {
  if (!date) {
    return 'Atual'
  }

  return new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}
</script>

<template>
  <q-timeline-entry
    :title="experience.role"
    :subtitle="`${formatDate(experience.startDate)} — ${
      experience.isCurrent ? 'Atual' : formatDate(experience.endDate)
    }`"
    :icon="
      getLogo(experience.company)
        ? `img:${getLogo(experience.company)}`
        : 'mdi-briefcase-outline'
    "
    color="primary"
  >
    <!-- Empresa -->
    <div class="q-mb-md">
      <div class="text-h6 text-weight-bold">
        {{ experience.company }}
      </div>

      <div class="text-caption">
        {{
          experience.isCurrent
            ? 'Experiência atual'
            : 'Experiência profissional'
        }}
      </div>
    </div>

    <!-- Descrição -->
    <div class="text-body1 experience-description">
      {{ experience.description }}
    </div>

    <!-- Tecnologias -->
    <div
      v-if="experience.technologies?.length"
      class="row q-gutter-xs q-mt-lg"
    >
      <q-chip
        v-for="technology in experience.technologies"
        :key="technology.id"
        dense
        outline
        color="primary"
        class="technology-chip"
      >
        {{ technology.name }}
      </q-chip>
    </div>
  </q-timeline-entry>
</template>

<style scoped>
.experience-description {
  line-height: 1.7;
}

.technology-chip {
  font-size: 12px;
}

:deep(.q-timeline__dot img) {
  width: 40px !important;
  height: 40px !important;
  object-fit: contain;
}

</style>