<template>
  <section>
    <div class="row items-center justify-between q-mb-md">
      <div>
        <h2 class="text-h5 q-my-none">Formação acadêmica</h2>
        <div class="text-caption text-grey-5">Cadastre e atualize cursos e instituições.</div>
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

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-lg-5">
        <q-card flat bordered>
          <q-card-section class="row items-center justify-between">
            <div class="text-h6">{{ editingId ? 'Editar formação' : 'Nova formação' }}</div>
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
              <q-input
                v-model="form.institution"
                outlined
                dense
                label="Instituição"
                maxlength="200"
                required
              />
              <q-input
                v-model="form.course"
                outlined
                dense
                label="Curso"
                maxlength="200"
                required
              />
              <q-input
                v-model="form.description"
                outlined
                type="textarea"
                autogrow
                label="Descrição"
                maxlength="10000"
              />
              <div class="row">
                <q-input
                  v-model="form.startDate"
                  class="col-12 col-sm-4 q-mr-sm"
                  outlined
                  dense
                  type="date"
                  label="Início"
                  stack-label
                />
                <q-input
                  v-model="form.endDate"
                  class="col-12 col-sm-4"
                  outlined
                  dense
                  type="date"
                  label="Conclusão"
                  stack-label
                />
              </div>
              <q-input
                v-model="form.logoUrl"
                outlined
                dense
                label="URL do logo (opcional)"
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
                  :label="editingId ? 'Salvar alterações' : 'Cadastrar formação'"
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
        <div v-if="isLoading" class="row justify-center q-pa-xl">
          <q-spinner color="primary" size="40px" aria-label="Carregando formações" />
        </div>
        <div v-else-if="!records.length" class="text-body2 q-pa-md">
          Nenhuma formação cadastrada.
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
              <q-icon name="mdi-school-outline" size="28px" color="primary" />
              <div class="col">
                <div class="text-subtitle1 text-weight-bold">{{ record.course }}</div>
                <div class="text-body2">{{ record.institution }}</div>
                <div class="text-caption text-grey-5">
                  {{ formatDate(record.startDate) }} — {{ formatDate(record.endDate) }}
                  · ordem {{ record.sortOrder }}
                </div>
              </div>
              <div class="row no-wrap">
                <q-btn
                  flat
                  dense
                  round
                  color="primary"
                  icon="mdi-pencil"
                  :aria-label="`Editar ${record.course}`"
                  @click="editRecord(record)"
                />
                <q-btn
                  flat
                  dense
                  round
                  color="negative"
                  icon="mdi-delete"
                  :aria-label="`Excluir ${record.course}`"
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
            aria-label="Paginação das formações"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { AdminEducation } from '#shared/types/admin-records'
import { useAdminPagination } from '~/composables/useAdminPagination'

interface EducationForm {
  institution: string
  course: string
  description: string
  startDate: string
  endDate: string
  logoUrl: string
  sortOrder: number
}

function emptyForm(): EducationForm {
  return {
    institution: '',
    course: '',
    description: '',
    startDate: '',
    endDate: '',
    logoUrl: '',
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

function toDateInput(value: string | null) {
  return value ? value.slice(0, 10) : ''
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : 'Em andamento'
}

const records = ref<AdminEducation[]>([])
const { currentPage, totalPages, paginatedRecords } = useAdminPagination(records)
const form = reactive<EducationForm>(emptyForm())
const editingId = ref<string | null>(null)
const deletingId = ref<string | null>(null)
const isLoading = ref(false)
const isSaving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

function resetForm() {
  Object.assign(form, emptyForm())
  editingId.value = null
}

function editRecord(record: AdminEducation) {
  editingId.value = record.id
  Object.assign(form, {
    institution: record.institution,
    course: record.course,
    description: record.description ?? '',
    startDate: toDateInput(record.startDate),
    endDate: toDateInput(record.endDate),
    logoUrl: record.logoUrl ?? '',
    sortOrder: record.sortOrder,
  })
  errorMessage.value = ''
  successMessage.value = ''
}

async function loadRecords() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    records.value = await $fetch<AdminEducation[]>('/api/dev-admin/education')
  } catch (error) {
    errorMessage.value = `Não foi possível carregar as formações: ${getErrorMessage(error)}`
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
    description: form.description || null,
    startDate: form.startDate || null,
    endDate: form.endDate || null,
    logoUrl: form.logoUrl || null,
  }

  try {
    if (editingId.value) {
      await $fetch(`/api/dev-admin/education/${editingId.value}`, { method: 'PUT', body })
      successMessage.value = 'Formação atualizada.'
    } else {
      await $fetch('/api/dev-admin/education', { method: 'POST', body })
      successMessage.value = 'Formação cadastrada.'
    }
    resetForm()
    await loadRecords()
  } catch (error) {
    errorMessage.value = `Não foi possível salvar a formação: ${getErrorMessage(error)}`
  } finally {
    isSaving.value = false
  }
}

async function deleteRecord(record: AdminEducation) {
  if (!window.confirm(`Excluir a formação "${record.course}"?`)) return

  deletingId.value = record.id
  errorMessage.value = ''
  successMessage.value = ''
  try {
    await $fetch(`/api/dev-admin/education/${record.id}`, { method: 'DELETE' })
    if (editingId.value === record.id) resetForm()
    successMessage.value = 'Formação excluída.'
    await loadRecords()
  } catch (error) {
    errorMessage.value = `Não foi possível excluir a formação: ${getErrorMessage(error)}`
  } finally {
    deletingId.value = null
  }
}

onMounted(loadRecords)
</script>
