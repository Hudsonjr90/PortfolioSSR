<template>
  <section>
    <div class="row items-center justify-between q-mb-md">
      <div>
        <h2 class="text-h5 q-my-none">Depoimentos</h2>
        <div class="text-caption text-grey-5">Associe cada depoimento a uma experiência.</div>
      </div>
      <q-btn
        flat
        color="primary"
        icon="mdi-refresh"
        label="Atualizar"
        :loading="isLoading"
        @click="loadRecords"
      />
    </div>

    <q-banner v-if="errorMessage" rounded class="bg-negative text-white q-mb-md">
      {{ errorMessage }}
    </q-banner>
    <q-banner v-if="successMessage" rounded class="bg-positive text-white q-mb-md">
      {{ successMessage }}
    </q-banner>
    <q-banner v-if="!experiences.length && !isLoading" rounded class="bg-warning text-dark q-mb-md">
      Cadastre uma experiência profissional antes de criar um depoimento.
    </q-banner>

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-lg-5">
        <q-card flat bordered class="admin-panel">
          <q-card-section class="row items-center justify-between">
            <div class="text-h6">{{ editingId ? 'Editar depoimento' : 'Novo depoimento' }}</div>
            <q-btn
              v-if="editingId"
              flat
              dense
              color="primary"
              label="Cancelar"
              @click="resetForm"
            />
          </q-card-section>
          <q-card-section>
            <q-form class="column q-gutter-md" @submit.prevent="saveRecord">
              <q-select
                v-model="form.experienceId"
                :options="experienceOptions"
                outlined
                emit-value
                map-options
                label="Experiência relacionada"
                required
              />
              <q-input
                v-model="form.name"
                outlined
                dense
                label="Nome"
                maxlength="160"
                required
              />
              <q-input v-model="form.role" outlined dense label="Cargo" maxlength="2000" />
              <q-input v-model="form.company" outlined dense label="Empresa" maxlength="2000" />
              <q-input
                v-model="form.content"
                outlined
                type="textarea"
                autogrow
                label="Depoimento"
                maxlength="10000"
                required
              />
              <q-input
                v-model="form.avatarUrl"
                outlined
                dense
                label="URL do avatar (opcional)"
                maxlength="2000"
              />
              <q-input
                v-model.number="form.sortOrder"
                outlined
                dense
                type="number"
                min="0"
                label="Ordem de exibição"
              />
              <div class="row q-gutter-sm">
                <q-btn
                  type="submit"
                  color="primary"
                  :label="editingId ? 'Salvar alterações' : 'Cadastrar depoimento'"
                  :loading="isSaving"
                  :disable="!experiences.length"
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
        <div v-if="isLoading" class="row justify-center q-pa-xl">
          <q-spinner color="primary" size="40px" aria-label="Carregando depoimentos" />
        </div>
        <div v-else-if="!records.length" class="text-body2 q-pa-md">
          Nenhum depoimento cadastrado.
        </div>
        <div v-else class="column q-gutter-md">
          <q-card
            v-for="record in paginatedRecords"
            :key="record.id"
            flat
            bordered
            class="admin-panel"
          >
            <q-card-section class="row items-start no-wrap q-gutter-md">
              <q-icon name="mdi-format-quote-open" size="28px" color="primary" />
              <div class="col">
                <div class="text-subtitle1 text-weight-bold">{{ record.name }}</div>
                <div class="text-caption text-grey-5">
                  {{ [record.role, record.company].filter(Boolean).join(' · ') || 'Sem cargo ou empresa' }}
                </div>
                <div class="text-caption text-primary q-mt-xs">
                  {{ record.experience.role }} · {{ record.experience.company }}
                </div>
                <p class="text-body2 q-mb-none q-mt-sm testimonial-content">{{ record.content }}</p>
                <div class="text-caption text-grey-5 q-mt-xs">Ordem {{ record.sortOrder }}</div>
              </div>
              <div class="row no-wrap">
                <q-btn
                  flat
                  dense
                  round
                  color="primary"
                  icon="mdi-pencil"
                  :aria-label="`Editar depoimento de ${record.name}`"
                  @click="editRecord(record)"
                />
                <q-btn
                  flat
                  dense
                  round
                  color="negative"
                  icon="mdi-delete"
                  :aria-label="`Excluir depoimento de ${record.name}`"
                  :loading="deletingId === record.id"
                  @click="deleteRecord(record)"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div v-if="totalPages > 1" class="row justify-center q-mt-lg">
          <q-pagination
            v-model="currentPage"
            :max="totalPages"
            :max-pages="5"
            boundary-numbers
            direction-links
            color="primary"
            aria-label="Paginação dos depoimentos"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import type { AdminExperience, AdminTestimonial } from '#shared/types/admin-records'
import { useAdminPagination } from '~/composables/useAdminPagination'

interface TestimonialForm {
  experienceId: string
  name: string
  role: string
  company: string
  content: string
  avatarUrl: string
  sortOrder: number
}

function emptyForm(): TestimonialForm {
  return {
    experienceId: '',
    name: '',
    role: '',
    company: '',
    content: '',
    avatarUrl: '',
    sortOrder: 0,
  }
}

function getErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    const data = error.data
    if (typeof data === 'object' && data !== null && 'statusMessage' in data) {
      return String(data.statusMessage)
    }
  }
  return error instanceof Error ? error.message : 'Ocorreu um erro inesperado.'
}

const records = ref<AdminTestimonial[]>([])
const { currentPage, totalPages, paginatedRecords } = useAdminPagination(records)
const experiences = ref<AdminExperience[]>([])
const form = reactive<TestimonialForm>(emptyForm())
const editingId = ref<string | null>(null)
const deletingId = ref<string | null>(null)
const isLoading = ref(false)
const isSaving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const experienceOptions = computed(() =>
  experiences.value.map((experience) => ({
    label: `${experience.role} · ${experience.company}`,
    value: experience.id,
  })),
)

function resetForm() {
  Object.assign(form, emptyForm())
  editingId.value = null
}

function editRecord(record: AdminTestimonial) {
  editingId.value = record.id
  Object.assign(form, {
    experienceId: record.experienceId,
    name: record.name,
    role: record.role ?? '',
    company: record.company ?? '',
    content: record.content,
    avatarUrl: record.avatarUrl ?? '',
    sortOrder: record.sortOrder,
  })
  errorMessage.value = ''
  successMessage.value = ''
}

async function loadRecords() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const [testimonialData, experienceData] = await Promise.all([
      $fetch<AdminTestimonial[]>('/api/dev-admin/testimonials'),
      $fetch<AdminExperience[]>('/api/dev-admin/experiences'),
    ])
    records.value = testimonialData
    experiences.value = experienceData
  } catch (error) {
    errorMessage.value = `Não foi possível carregar os depoimentos: ${getErrorMessage(error)}`
  } finally {
    isLoading.value = false
  }
}

async function saveRecord() {
  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''
  const body = {
    ...form,
    role: form.role || null,
    company: form.company || null,
    avatarUrl: form.avatarUrl || null,
  }

  try {
    if (editingId.value) {
      await $fetch(`/api/dev-admin/testimonials/${editingId.value}`, { method: 'PUT', body })
      successMessage.value = 'Depoimento atualizado.'
    } else {
      await $fetch('/api/dev-admin/testimonials', { method: 'POST', body })
      successMessage.value = 'Depoimento cadastrado.'
    }
    resetForm()
    await loadRecords()
  } catch (error) {
    errorMessage.value = `Não foi possível salvar o depoimento: ${getErrorMessage(error)}`
  } finally {
    isSaving.value = false
  }
}

async function deleteRecord(record: AdminTestimonial) {
  if (!window.confirm(`Excluir o depoimento de "${record.name}"?`)) return

  deletingId.value = record.id
  errorMessage.value = ''
  successMessage.value = ''
  try {
    await $fetch(`/api/dev-admin/testimonials/${record.id}`, { method: 'DELETE' })
    if (editingId.value === record.id) resetForm()
    successMessage.value = 'Depoimento excluído.'
    await loadRecords()
  } catch (error) {
    errorMessage.value = `Não foi possível excluir o depoimento: ${getErrorMessage(error)}`
  } finally {
    deletingId.value = null
  }
}

onMounted(loadRecords)
</script>

<style scoped>
.admin-panel {
  background: rgba(20, 20, 20, 0.72);
  backdrop-filter: blur(12px);
}

.testimonial-content {
  white-space: pre-wrap;
}
</style>
