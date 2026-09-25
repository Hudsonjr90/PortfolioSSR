<template>
  <section id="projetos" class="q-py-xl" aria-labelledby="projects-title">
    <div class="wrapper">
      <div class="q-mb-xl text-left">
        <div class="text-primary text-weight-bold">Projetos</div>

        <h2 id="projects-title" class="text-h3 text-weight-bold q-mt-sm q-mb-md">
          Projetos em destaque
        </h2>

        <p class="text-body1 q-my-none">
          Alguns projetos que tive a oportunidade de desenvolver e/ou contribuir, demonstrando
          minhas habilidades e competências.
        </p>
      </div>

      <div class="row q-col-gutter-lg gt-xs">
        <div v-for="project in projects" :key="project.name" class="col-12 col-md-6">
          <q-card bordered flat class="full-height bg-transparent backdrop-blur">
            <q-img
              :src="project.image"
              :alt="`Overview do projeto ${project.name}`"
              width="100%"
              height="50%"
              fit="cover"
            />

            <q-card-section class="text-white q-pa-lg">
              <div class="text-caption text-grey-4">
                {{ project.category }}
              </div>

              <div class="text-h5 text-weight-bold q-mt-xs">
                {{ project.name }}
              </div>
            </q-card-section>

            <q-separator color="grey-8" />

            <q-card-section class="column full-height q-pa-lg">
              <div>
                <p class="text-primary text-weight-medium q-mt-sm q-mb-none">
                  {{ project.subtitle }}
                </p>

                <p class="text-body2 q-mt-md q-mb-none">
                  {{ project.description }}
                </p>
              </div>

              <div class="row q-gutter-sm q-mt-xs" aria-label="Tecnologias utilizadas">
                <q-badge
                  v-for="technology in project.technologies"
                  :key="technology"
                  color="primary"
                  outline
                  :label="technology"
                  class="text-body2"
                />
              </div>

              <div class="row items-center q-gutter-sm q-mt-auto">
                <q-btn
                  v-if="project.url"
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  icon-right="mdi-arrow-top-right"
                  label="Ver projeto"
                />

                <q-btn
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  flat
                  color="primary"
                  icon="mdi-github"
                  aria-label="Ver projeto no GitHub"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-carousel
        v-if="isMobile"
        v-model="activeProject"
        class="bg-transparent backdrop-blur"
        animated
        navigation
        swipeable
        control-color="primary"
        height="720px"
      >
        <q-carousel-slide
          v-for="(project, index) in projects"
          :key="project.name"
          :name="index"
          class="q-pa-none"
        >
          <q-card bordered flat class="full-height bg-transparent backdrop-blur">
            <q-img :src="project.image" :alt="`Overview do projeto ${project.name}`" fit="cover" />

            <q-card-section class="text-white q-pa-lg">
              <div class="text-caption text-grey-4">
                {{ project.category }}
              </div>

              <div class="text-h5 text-weight-bold q-mt-xs">
                {{ project.name }}
              </div>
            </q-card-section>

            <q-separator color="grey-8" />

            <q-card-section class="column q-pa-lg">
              <p class="text-primary text-weight-medium q-mt-sm q-mb-none">
                {{ project.subtitle }}
              </p>

              <p class="text-body2 q-mt-md q-mb-none">
                {{ project.description }}
              </p>

              <div class="row q-gutter-sm q-mt-lg" aria-label="Tecnologias utilizadas">
                <q-badge
                  v-for="technology in project.technologies"
                  :key="technology"
                  color="primary"
                  outline
                  :label="technology"
                  class="text-body2"
                />
              </div>

              <div class="row items-center q-gutter-sm q-mt-lg">
                <q-btn
                  v-if="project.url"
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  icon-right="mdi-arrow-top-right"
                  label="Ver projeto"
                />

                <q-btn
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  flat
                  color="primary"
                  icon="mdi-github"
                  aria-label="Ver projeto no GitHub"
                />
              </div>
            </q-card-section>
          </q-card>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import agendaAI from '../../assets/images/agenda.png'
import fieldActivity from '../../assets/images/field.png'
import gdxEnergia from '../../assets/images/gdx.png'
import desmentiApp from '../../assets/images/desmenti.png'

interface Project {
  name: string
  category: string
  subtitle: string
  description: string
  icon: string
  image: string
  technologies: string[]
  url?: string
  github?: string
}

const activeProject = ref(0)
const { isMobile } = useMobile()

const projects: Project[] = [
  {
    name: 'AgendaAI',
    category: 'SaaS · Multi-tenant',
    subtitle: 'Gestão de agendamentos para negócios de serviços',
    description:
      'Plataforma desenvolvida para centralizar a operação de barbearias e negócios de serviços, com organizações, unidades, profissionais, serviços e agendamentos.',
    icon: 'mdi-calendar-clock',
    image: agendaAI,
    technologies: ['Nuxt', 'NestJS', 'Prisma', 'PostgreSQL'],
  },
  {
    name: 'Field Activity',
    category: 'Gestão · Operação',
    subtitle: 'Plataforma para gestão de atividades em campo',
    description:
      'Solução desenvolvida para registrar e acompanhar atividades realizadas em campo, utilizando geolocalização, validações e evidências fotográficas.',
    icon: 'mdi-map-marker-radius',
    image: fieldActivity,
    technologies: ['Vue 3', 'Quasar', 'NestJS', 'Prisma', 'PostgreSQL'],
  },
  {
    name: 'GDX Energia',
    category: 'Web · Performance · SEO',
    subtitle: 'Modernização da experiência digital',
    description:
      'Projeto de modernização da aplicação com foco em experiência do usuário, responsividade, performance, organização do frontend e otimização para mecanismos de busca.',
    icon: 'mdi-lightning-bolt',
    image: gdxEnergia,
    technologies: ['Vue 3', 'Quasar', 'Vite', 'SEO'],
  },
  {
    name: 'Desmenti App',
    category: 'Mobile · Social',
    subtitle: 'Aplicativo para verificação de fatos',
    description:
      'Aplicativo desenvolvido para permitir que os usuários verifiquem a veracidade de informações e notícias, promovendo a disseminação de conteúdo confiável.',
    icon: 'mdi-new-box',
    image: desmentiApp,
    technologies: [
      'React',
      'TypeScript',
      'ShadCN/UI',
      'Radix UI',
      'TailwindCSS',
      'Python',
      'Flask',
      'pytest',
      'Redis',
      'PostgreSQL',
      'docker',
    ],
  },
]
</script>
