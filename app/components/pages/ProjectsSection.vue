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

      <q-banner v-if="projectsError" class="bg-negative text-white q-mb-md" rounded>
        Não foi possível carregar os projetos. {{ projectsError.message }}
      </q-banner>

      <div v-else-if="projectsPending" class="row justify-center q-pa-xl">
        <q-spinner color="primary" size="40px" aria-label="Carregando projetos" />
      </div>

      <div v-else-if="!projects.length" class="text-body1 q-py-lg">
        Nenhum projeto publicado no momento.
      </div>

      <div v-else class="row q-col-gutter-md">
        <div
          v-for="(project, index) in paginatedProjects"
          :key="project.id"
          class="col-12 col-sm-6 col-lg-4"
        >
          <q-card
            bordered
            flat
            clickable
            role="button"
            :aria-label="`Ver detalhes de ${project.name || `projeto ${(currentPage - 1) * projectsPerPage + index + 1}`}`"
            class="full-height project-card"
            :class="isDark ? 'bg-transparent backdrop-blur' : 'bg-dark'"
            @click="openProject(project)"
            @keyup.enter="openProject(project)"
            @keyup.space.prevent="openProject(project)"
          >
            <q-img
              :src="resolveProjectAsset(project.image)"
              :alt="`Prévia do projeto ${project.name || 'em breve'}`"
              width="100%"
              height="200px"
              fit="cover"
            />

            <q-card-section class="text-white q-pa-md">
              <div v-if="project.category" class="text-caption text-grey-4">
                {{ project.category }}
              </div>

              <div class="row items-center no-wrap q-gutter-sm q-mt-xs">
                <q-icon
                  v-if="project.icon"
                  :name="project.icon"
                  size="24px"
                  color="primary"
                  aria-hidden="true"
                />
                <div class="text-h6 text-weight-bold">
                  {{ project.name || 'Projeto em breve' }}
                </div>
              </div>

              <p v-if="project.subtitle" class="text-primary text-weight-medium q-mt-sm q-mb-none">
                {{ project.subtitle }}
              </p>

              <div
                v-if="project.technologies.length"
                class="row q-gutter-sm q-mt-md"
                aria-label="Tecnologias utilizadas"
              >
                <q-badge
                  v-for="technology in project.technologies"
                  :key="technology"
                  color="primary"
                  outline
                  :label="technology"
                  class="text-body2"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div v-if="!projectsError && totalPages > 1" class="row justify-center q-mt-xl">
        <q-pagination
          v-model="currentPage"
          :max="totalPages"
          :max-pages="5"
          boundary-numbers
          direction-links
          color="primary"
          aria-label="Paginação dos projetos"
        />
      </div>

      <ProjectsCard v-model="isProjectCardOpen" :project="selectedProject" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ProjectsCard from './ProjectsCard.vue'
import type { ProjectRecord } from '#shared/types/project'
import { resolveProjectAsset } from '~/utils/global'

const { isDark } = useTheme()
const projectsPerPage = 3
const currentPage = ref(1)
const selectedProject = ref<ProjectRecord | null>(null)
const isProjectCardOpen = ref(false)

const {
  data: projectsData,
  error: projectsError,
  pending: projectsPending,
} = await useFetch<ProjectRecord[]>('/api/projects', {
  key: 'projects',
  server: true,
})

const projects = computed(() => projectsData.value ?? [])
const totalPages = computed(() => Math.ceil(projects.value.length / projectsPerPage))
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * projectsPerPage
  return projects.value.slice(start, start + projectsPerPage)
})

function openProject(project: ProjectRecord) {
  selectedProject.value = project
  isProjectCardOpen.value = true
}
</script>

<style scoped>
.project-card {
  cursor: pointer;
  transition:
    transform 180ms ease,
    border-color 180ms ease;
}

.project-card:hover {
  transform: translateY(-3px);
  border-color: var(--q-primary);
}
</style>
