<template>
  <main class="wrapper q-py-xl">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <div class="text-overline text-primary">Modo de desenvolvimento</div>
        <h1 class="text-h4 q-my-none">Painel administrativo</h1>
      </div>
      <q-btn
        v-if="isAuthenticated"
        flat
        color="primary"
        icon="mdi-logout"
        label="Sair"
        :loading="isSaving"
        @click="logout"
      />
    </div>

    <q-banner v-if="errorMessage" rounded class="bg-negative text-white q-mb-md">
      {{ errorMessage }}
    </q-banner>
    <q-banner v-if="successMessage" rounded class="bg-positive text-white q-mb-md">
      {{ successMessage }}
    </q-banner>

    <div v-if="isChecking" class="row justify-center q-pa-xl">
      <q-spinner color="primary" size="40px" aria-label="Verificando sessão" />
    </div>

    <q-card v-else-if="!isAuthenticated" flat bordered class="admin-panel">
      <q-card-section>
        <div class="text-h6">Acesso local</div>
        <p class="text-body2 q-mb-none">
          Entre com a senha configurada em <code>DEV_ADMIN_PASSWORD</code> no arquivo
          <code>.env</code>.
        </p>
      </q-card-section>
      <q-card-section>
        <q-form class="column q-gutter-md" @submit.prevent="login">
          <q-input
            v-model="password"
            outlined
            dense
            type="password"
            label="Senha de desenvolvimento"
            autocomplete="current-password"
            autofocus
          />
          <div>
            <q-btn
              type="submit"
              color="primary"
              label="Entrar"
              :loading="isSaving"
              :disable="!password"
            />
            <q-btn
              flat
              unelevated
              icon="mdi-arrow-left"
              color="primary"
              label="Voltar ao portfólio"
              class="q-ml-md"
              to="/"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <template v-else>
      <q-tabs
        v-model="activeSection"
        align="left"
        active-color="primary"
        indicator-color="primary"
        class="admin-tabs q-mb-lg"
        outside-arrows
        mobile-arrows
      >
        <q-tab
          v-for="section in sections"
          :key="section.name"
          :name="section.name"
          :icon="section.icon"
          :label="section.label"
          no-caps
        />
      </q-tabs>

      <div v-if="activeSection === 'projects'" class="row q-col-gutter-lg">
        <div class="col-12 col-lg-5">
          <q-card flat bordered class="admin-panel">
            <q-card-section class="row items-center justify-between">
              <div class="text-h6">{{ editingId ? 'Editar projeto' : 'Novo projeto' }}</div>
              <q-btn
                v-if="editingId"
                flat
                dense
                color="primary"
                label="Cancelar edição"
                @click="resetForm"
              />
            </q-card-section>

            <q-card-section>
              <q-form class="column q-gutter-md" @submit.prevent="saveProject">
                <q-input v-model="form.name" outlined dense label="Nome" required maxlength="160" />
                <q-input
                  v-model="form.slug"
                  outlined
                  dense
                  label="Slug (ex.: agenda-ai)"
                  hint="Use letras minúsculas, números e hífens."
                  required
                  maxlength="100"
                />
                <q-input v-model="form.category" outlined dense label="Categoria" />
                <q-input v-model="form.subtitle" outlined dense label="Subtítulo" />
                <q-input
                  v-model="form.description"
                  outlined
                  type="textarea"
                  autogrow
                  label="Descrição"
                />
                <q-input v-model="form.icon" outlined dense label="Ícone MDI" />
                <q-input
                  v-model="form.image"
                  outlined
                  dense
                  label="Imagem"
                  hint="Arquivo em assets/images, caminho /... ou URL pública."
                  required
                />
                <q-input
                  v-model="form.previewGif"
                  outlined
                  dense
                  label="GIF de prévia"
                  hint="Ex.: gifs/agenda.gif dentro de assets/images."
                />
                <q-input
                  v-model="form.technologies"
                  outlined
                  type="textarea"
                  autogrow
                  label="Tecnologias"
                  hint="Separe cada tecnologia por vírgula."
                />
                <q-input v-model="form.url" outlined dense label="URL do deploy" />
                <q-input v-model="form.github" outlined dense label="URL do GitHub" />
                <q-input
                  v-model="form.sortOrder"
                  outlined
                  dense
                  type="number"
                  min="0"
                  label="Ordem"
                />
                <q-toggle v-model="form.isPublished" color="primary" label="Publicado" />
                <div class="row q-gutter-sm">
                  <q-btn
                    type="submit"
                    color="primary"
                    :label="editingId ? 'Salvar alterações' : 'Cadastrar projeto'"
                    :loading="isSaving"
                  />
                  <q-btn
                    v-if="!editingId"
                    type="reset"
                    flat
                    color="primary"
                    label="Limpar"
                    @click="resetForm"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-lg-7">
          <div class="row items-center justify-between q-mb-sm">
            <h2 class="text-h6 q-my-none">Projetos cadastrados</h2>
            <q-btn
              flat
              dense
              color="primary"
              icon="mdi-refresh"
              label="Atualizar"
              :loading="isLoadingProjects"
              @click="loadProjects"
            />
          </div>

          <div v-if="isLoadingProjects" class="row justify-center q-pa-xl">
            <q-spinner color="primary" size="40px" aria-label="Carregando projetos" />
          </div>
          <div v-else-if="!adminProjects.length" class="text-body2 q-pa-md">
            Ainda não há projetos cadastrados.
          </div>
          <div v-else class="column q-gutter-md">
            <q-card
              v-for="project in adminProjects"
              :key="project.id"
              flat
              bordered
              class="admin-panel"
            >
              <q-card-section class="row items-center no-wrap q-gutter-md">
                <q-img
                  :src="resolveProjectAsset(project.image)"
                  :alt="`Prévia de ${project.name}`"
                  width="96px"
                  height="72px"
                  fit="cover"
                  class="rounded-borders"
                />
                <div class="col">
                  <div class="text-subtitle1 text-weight-bold">{{ project.name }}</div>
                  <div class="text-caption text-grey-5">
                    {{ project.slug }} · ordem {{ project.sortOrder }}
                  </div>
                  <q-badge
                    :color="project.isPublished ? 'positive' : 'grey'"
                    :label="project.isPublished ? 'Publicado' : 'Rascunho'"
                    class="q-mt-xs"
                  />
                </div>
                <div class="column q-gutter-xs">
                  <q-btn
                    flat
                    dense
                    round
                    color="primary"
                    icon="mdi-pencil"
                    :aria-label="`Editar ${project.name}`"
                    @click="editProject(project)"
                  />
                  <q-btn
                    flat
                    dense
                    round
                    color="negative"
                    icon="mdi-delete"
                    :aria-label="`Excluir ${project.name}`"
                    :loading="deletingId === project.id"
                    @click="deleteProject(project)"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <AdminEducationSection v-else-if="activeSection === 'education'" />
      <AdminExperienceSection v-else-if="activeSection === 'experience'" />
      <AdminTestimonialsSection v-else-if="activeSection === 'testimonials'" />
      <AdminTechnologySection v-else-if="activeSection === 'technology'" />
    </template>
  </main>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { ProjectInput, ProjectRecord } from '#shared/types/project'
import { resolveProjectAsset } from '~/utils/global'
import AdminEducationSection from './AdminEducationSection.vue'
import AdminExperienceSection from './AdminExperienceSection.vue'
import AdminTestimonialsSection from './AdminTestimonialsSection.vue'
import AdminTechnologySection from './AdminTechnologySection.vue'

if (!import.meta.dev) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found' })
}

interface ProjectForm {
  slug: string
  name: string
  category: string
  subtitle: string
  description: string
  icon: string
  image: string
  previewGif: string
  technologies: string
  url: string
  github: string
  sortOrder: string
  isPublished: boolean
}

function emptyForm(): ProjectForm {
  return {
    slug: '',
    name: '',
    category: '',
    subtitle: '',
    description: '',
    icon: '',
    image: '',
    previewGif: '',
    technologies: '',
    url: '',
    github: '',
    sortOrder: '0',
    isPublished: true,
  }
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Ocorreu um erro inesperado.'
}

function isUnauthorized(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    (('statusCode' in error && error.statusCode === 401) ||
      ('status' in error && error.status === 401))
  )
}

const isAuthenticated = ref(false)
const isChecking = ref(true)
const isSaving = ref(false)
const isLoadingProjects = ref(false)
const deletingId = ref<string | null>(null)
const password = ref('')
const editingId = ref<string | null>(null)
const adminProjects = ref<ProjectRecord[]>([])
const errorMessage = ref('')
const successMessage = ref('')
const form = reactive<ProjectForm>(emptyForm())
const activeSection = ref('projects')

const sections = [
  { name: 'projects', label: 'Projetos', icon: 'mdi-briefcase-outline' },
  { name: 'education', label: 'Formação acadêmica', icon: 'mdi-school-outline' },
  { name: 'experience', label: 'Experiência profissional', icon: 'mdi-office-building-outline' },
  { name: 'testimonials', label: 'Depoimentos', icon: 'mdi-message-text-outline' },
  { name: 'technology', label: 'Stack tecnológica', icon: 'mdi-code-braces' },
]

function resetForm() {
  Object.assign(form, emptyForm())
  editingId.value = null
}

function editProject(project: ProjectRecord) {
  editingId.value = project.id
  Object.assign(form, {
    slug: project.slug,
    name: project.name,
    category: project.category ?? '',
    subtitle: project.subtitle ?? '',
    description: project.description,
    icon: project.icon ?? '',
    image: project.image,
    previewGif: project.previewGif ?? '',
    technologies: project.technologies.join(', '),
    url: project.url ?? '',
    github: project.github ?? '',
    sortOrder: String(project.sortOrder),
    isPublished: project.isPublished,
  })
  errorMessage.value = ''
  successMessage.value = ''
}

function toProjectInput(): ProjectInput {
  return {
    slug: form.slug.trim(),
    name: form.name.trim(),
    category: form.category.trim() || null,
    subtitle: form.subtitle.trim() || null,
    description: form.description,
    icon: form.icon.trim() || null,
    image: form.image.trim(),
    previewGif: form.previewGif.trim() || null,
    technologies: form.technologies
      .split(',')
      .map((technology) => technology.trim())
      .filter(Boolean),
    url: form.url.trim() || null,
    github: form.github.trim() || null,
    sortOrder: Number(form.sortOrder),
    isPublished: form.isPublished,
  }
}

async function loadProjects() {
  isLoadingProjects.value = true
  errorMessage.value = ''

  try {
    adminProjects.value = await $fetch<ProjectRecord[]>('/api/dev-admin/projects')
  } catch (error) {
    errorMessage.value = `Não foi possível carregar os projetos: ${getErrorMessage(error)}`
  } finally {
    isLoadingProjects.value = false
  }
}

async function login() {
  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await $fetch('/api/dev-admin/login', {
      method: 'POST',
      body: { password: password.value },
    })
    isAuthenticated.value = true
    password.value = ''
    await loadProjects()
  } catch (error) {
    errorMessage.value = `Não foi possível entrar: ${getErrorMessage(error)}`
  } finally {
    isSaving.value = false
  }
}

async function logout() {
  isSaving.value = true
  errorMessage.value = ''

  try {
    await $fetch('/api/dev-admin/logout', { method: 'POST' })
    isAuthenticated.value = false
    adminProjects.value = []
    resetForm()
  } catch (error) {
    errorMessage.value = `Não foi possível sair: ${getErrorMessage(error)}`
  } finally {
    isSaving.value = false
  }
}

async function saveProject() {
  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const body = toProjectInput()
    if (editingId.value) {
      await $fetch(`/api/dev-admin/projects/${editingId.value}`, {
        method: 'PUT',
        body,
      })
      successMessage.value = 'Projeto atualizado.'
    } else {
      await $fetch('/api/dev-admin/projects', {
        method: 'POST',
        body,
      })
      successMessage.value = 'Projeto cadastrado.'
    }

    resetForm()
    await loadProjects()
  } catch (error) {
    errorMessage.value = `Não foi possível salvar o projeto: ${getErrorMessage(error)}`
  } finally {
    isSaving.value = false
  }
}

async function deleteProject(project: ProjectRecord) {
  if (!window.confirm(`Excluir "${project.name}" permanentemente?`)) return

  deletingId.value = project.id
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await $fetch(`/api/dev-admin/projects/${project.id}`, { method: 'DELETE' })
    if (editingId.value === project.id) resetForm()
    successMessage.value = 'Projeto excluído.'
    await loadProjects()
  } catch (error) {
    errorMessage.value = `Não foi possível excluir o projeto: ${getErrorMessage(error)}`
  } finally {
    deletingId.value = null
  }
}

onMounted(async () => {
  try {
    await $fetch('/api/dev-admin/session')
    isAuthenticated.value = true
    await loadProjects()
  } catch (error) {
    if (!isUnauthorized(error)) {
      errorMessage.value = `Não foi possível verificar a sessão: ${getErrorMessage(error)}`
    }
  } finally {
    isChecking.value = false
  }
})
</script>

<style scoped>
.admin-panel {
  background: rgba(20, 20, 20, 0.72);
  backdrop-filter: blur(12px);
}

.admin-tabs {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
</style>
