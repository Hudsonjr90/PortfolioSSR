<template>
  <q-timeline-entry
    :title="experience.role"
    :subtitle="`${formatDate(experience.startDate)} — ${
      experience.isCurrent ? 'Atual' : formatDate(experience.endDate)
    }`"
    :icon="
      getLogo(experience.company) ? `img:${getLogo(experience.company)}` : 'mdi-briefcase-outline'
    "
    color="primary"
  >
    <!-- Empresa -->
    <div class="q-mb-md">
      <div class="text-h6 text-weight-bold">
        {{ experience.company }}
      </div>

      <div class="text-caption">
        {{ experience.isCurrent ? 'Experiência atual' : 'Experiência profissional' }}
      </div>
    </div>

    <!-- Descrição original do backend -->
    <div class="text-body1 experience-description">
      {{ experience.description }}
    </div>

    <div v-if="experienceDetailsForCurrent" class="q-mt-md">
      <div class="text-subtitle1 text-weight-bold q-mb-sm">
        {{ EXPERIENCE_DETAILS_HEADING }}
      </div>

      <ul class="q-pl-lg q-mt-none q-mb-none">
        <li
          v-for="(responsibility, index) in experienceDetailsForCurrent.responsibilities"
          :key="index"
          class="q-mb-xs"
        >
          {{ responsibility }}
        </li>
      </ul>
    </div>

    <!-- Tecnologias -->
    <div v-if="experience.technologies?.length" class="row q-gutter-xs q-mt-lg">
      <q-badge
        v-for="technology in experience.technologies"
        :key="technology.id"
        dense
        outline
        color="primary"
        class="technology-chip q-px-md q-py-sm"
      >
        {{ technology.name }}
      </q-badge>
    </div>
  </q-timeline-entry>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const experienceDetailsForCurrent = computed(() => getExperienceDetails(props.experience.company))
interface ExperienceTechnology {
  id: string
  name: string
  category: string
  icon: string | null
  sortOrder: number
  featured: boolean
}

interface Experience {
  id: string
  company: string
  role: string
  description: string
  startDate: string
  endDate: string | null
  isCurrent: boolean
  technologies: ExperienceTechnology[]
}

interface ExperienceDetails {
  responsibilities: string[]
}

const props = defineProps<{
  experience: Experience
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
  hm: '/images/experiences/hm.png',
}
const EXPERIENCE_DETAILS_HEADING = 'Principais responsabilidades'

const experienceDetails: Record<string, ExperienceDetails> = {
  hm: {
    responsibilities: [
      'Desenvolvimento hands-on de aplicações web e soluções Full Stack, atuando no frontend e backend.',
      'Definição de arquitetura de software, seleção de tecnologias e decisões técnicas alinhadas às necessidades de cada projeto.',
      'Desenvolvimento e integração de APIs e serviços, considerando organização, manutenção e evolução das aplicações.',
      'Participação em reuniões com clientes, levantamento de requisitos e tradução de necessidades de negócio em soluções técnicas.',
      'Avaliação de alternativas tecnológicas e definição de abordagens para implementação das soluções.',
      'Aplicação de boas práticas de engenharia de software, componentização, refatoração e organização de código.',
      'Participação nas decisões relacionadas à evolução tecnológica e ao direcionamento dos projetos da empresa.',
    ],
  },
  afilio: {
    responsibilities: [
      'Desenvolvimento frontend com Vue.js, Quasar e TypeScript.',
      'Implementação e manutenção de serviços backend com Node.js e NestJS.',
      'Comunicação entre serviços utilizando gRPC.',
      'Modelagem e persistência de dados com Prisma ORM e PostgreSQL.',
      'Criação e refatoração de componentes reutilizáveis.',
      'Integração com APIs e desenvolvimento de testes automatizados com Cypress.',
    ],
  },

  cubo: {
    responsibilities: [
      'Implementação de interfaces utilizando React, TypeScript, Styled Components e Tailwind CSS.',
      'Criação e manutenção de layouts responsivos e componentes reutilizáveis.',
      'Refatoração e otimização de páginas e componentes.',
      'Desenvolvimento de testes automatizados com Cypress e Jest.',
    ],
  },

  terapiadebolso: {
    responsibilities: [
      'Atualização da aplicação de Angular 14 para Angular 15.',
      'Ajustes de dependências e correções de código.',
      'Manutenção de componentes e adequação de layouts e estilos com Sass/SCSS.',
    ],
  },

  cast: {
    responsibilities: [
      'Desenvolvimento frontend com Angular, React, TypeScript e JavaScript.',
      'Implementação backend com Java, Spring Boot, Node.js e Express.',
      'Desenvolvimento e integração de APIs.',
      'Utilização de PostgreSQL para persistência de dados.',
      'Manutenção e refatoração de aplicações existentes.',
    ],
  },

  atlas: {
    responsibilities: [
      'Criação e otimização de páginas.',
      'Melhorias no carregamento de imagens.',
      'Desenvolvimento de layouts e estilos com Sass/SCSS.',
      'Utilização de Docker e Webpack no ambiente de desenvolvimento e empacotamento da aplicação.',
    ],
  },

  vilt: {
    responsibilities: [
      'Desenvolvimento frontend com Angular e React.',
      'Atuação backend com Java e Node.js.',
      'Trabalho com Adobe Experience Manager (AEM).',
      'Participação em serviços para clientes como Porto e CVC.',
    ],
  },
}

function normalizeCompanyName(company: string): string {
  return company
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

function getLogo(company: string): string | null {
  const normalizedCompany = normalizeCompanyName(company)

  if (experienceLogos[normalizedCompany]) {
    return experienceLogos[normalizedCompany]
  }

  const match = Object.entries(experienceLogos).find(([key]) => normalizedCompany.includes(key))

  return match ? match[1] : null
}

function getExperienceDetails(company: string): ExperienceDetails | undefined {
  const normalizedCompany = normalizeCompanyName(company)

  const matchingKey = Object.keys(experienceDetails).find(
    (key) => normalizedCompany === key || normalizedCompany.includes(key),
  )

  return matchingKey ? experienceDetails[matchingKey] : undefined
}
</script>

<style scoped>
.experience-description {
  line-height: 1.7;
}

.experience-responsibilities {
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
