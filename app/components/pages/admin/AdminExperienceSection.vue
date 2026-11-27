<template>
  <section>
    <div class="row items-center justify-between q-mb-md">
      <div>
        <h2 class="text-h5 q-my-none">Experiência profissional</h2>
        <div class="text-caption text-grey-5">Empresas, cargos, períodos e tecnologias usadas.</div>
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
            <div class="text-h6">{{ editingId ? 'Editar experiência' : 'Nova experiência' }}</div>
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
                v-model="form.company"
                outlined
                dense
                label="Empresa"
                maxlength="200"
                required
              />
              <q-input
                v-model="form.role"
                outlined
                dense
                label="Cargo"
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
                required
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
                  required
                />
                <q-input
                  v-model="form.endDate"
                  class="col-12 col-sm-4"
                  outlined
                  dense
                  type="date"
                  label="Término"
                  stack-label
                  :disable="form.isCurrent"
                />
              </div>
              <q-toggle v-model="form.isCurrent" color="primary" label="Trabalho atual" />
              <q-input
                v-model="form.logoUrl"
                outlined
                dense
                label="URL do logo (opcional)"
                maxlength="2000"
              />
              <q-select
                v-model="form.technologyIds"
                :options="technologyOptions"
                outlined
                multiple
                use-chips
                emit-value
                map-options
                option-value="value"
                option-label="label"
                label="Tecnologias utilizadas"
                hint="Cadastre as tecnologias na aba Stack tecnológica."
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
                  :label="editingId ? 'Salvar alterações' : 'Cadastrar experiência'"
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
          <q-spinner color="primary" size="40px" aria-label="Carregando experiências" />
        </div>
        <div v-else-if="!records.length" class="text-body2 q-pa-md">
          Nenhuma experiência cadastrada.
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
              <q-icon name="mdi-office-building-outline" size="28px" color="primary" />
              <div class="col">
                <div class="text-subtitle1 text-weight-bold">{{ record.role }}</div>
                <div class="text-body2">{{ record.company }}</div>
                <div class="text-caption text-grey-5">
                  {{ formatDate(record.startDate) }} — {{ record.isCurrent ? 'Atual' : formatDate(record.endDate) }}
                  · ordem {{ record.sortOrder }}
                </div>
                <div v-if="record.technologies.length" class="row q-gutter-xs q-mt-sm">
                  <q-badge
                    v-for="{ technology } in record.technologies"
                    :key="technology.id"
                    outline
                    color="primary"
                    :label="technology.name"
                  />
                </div>
                <div v-if="record.testimonials?.length" class="text-caption text-grey-5 q-mt-sm">
                  {{ record.testimonials.length }} depoimento(s) associado(s)
                </div>
              </div>
              <div class="row no-wrap">
                <q-btn
                  flat
                  dense
                  round
                  color="primary"
                  icon="mdi-pencil"
                  :aria-label="`Editar experiência em ${record.company}`"
                  @click="editRecord(record)"
                />
                <q-btn
                  flat
                  dense
                  round
                  color="negative"
                  icon="mdi-delete"
                  :aria-label="`Excluir experiência em ${record.company}`"
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
            aria-label="Paginação das experiências"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import type { AdminExperience, AdminTechnology } from '#shared/types/admin-records'
import { useAdminPagination } from '~/composables/useAdminPagination'

interface ExperienceForm {
  company: string
  role: string
  description: string
  startDate: string
  endDate: string
  isCurrent: boolean
  logoUrl: string
  sortOrder: number
  technologyIds: string[]
}

function emptyForm(): ExperienceForm {
  return {
    company: '',
    role: '',
    description: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    logoUrl: '',
    sortOrder: 0,
    technologyIds: [],
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
  return value ? new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : ''
}

const records = ref<AdminExperience[]>([])
const { currentPage, totalPages, paginatedRecords } = useAdminPagination(records)
const technologies = ref<AdminTechnology[]>([])
const form = reactive<ExperienceForm>(emptyForm())
const editingId = ref<string | null>(null)
const deletingId = ref<string | null>(null)
const isLoading = ref(false)
const isSaving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const technologyOptions = computed(() =>
  technologies.value.map((technology) => ({
    label: technology.name,
    value: technology.id,
  })),
)

function resetForm() {
  Object.assign(form, emptyForm())
  editingId.value = null
}

function editRecord(record: AdminExperience) {
  editingId.value = record.id
  Object.assign(form, {
    company: record.company,
    role: record.role,
    description: record.description,
    startDate: toDateInput(record.startDate),
    endDate: toDateInput(record.endDate),
    isCurrent: record.isCurrent,
    logoUrl: record.logoUrl ?? '',
    sortOrder: record.sortOrder,
    technologyIds: record.technologies.map(({ technology }) => technology.id),
  })
  errorMessage.value = ''
  successMessage.value = ''
}

async function loadRecords() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const [experienceData, technologyData] = await Promise.all([
      $fetch<AdminExperience[]>('/api/dev-admin/experiences'),
      $fetch<AdminTechnology[]>('/api/dev-admin/technology'),
    ])
    records.value = experienceData
    technologies.value = technologyData
  } catch (error) {
    errorMessage.value = `Não foi possível carregar as experiências: ${getErrorMessage(error)}`
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
    endDate: form.isCurrent ? null : form.endDate || null,
    logoUrl: form.logoUrl || null,
  }

  try {
    if (editingId.value) {
      await $fetch(`/api/dev-admin/experiences/${editingId.value}`, { method: 'PUT', body })
      successMessage.value = 'Experiência atualizada.'
    } else {
      await $fetch('/api/dev-admin/experiences', { method: 'POST', body })
      successMessage.value = 'Experiência cadastrada.'
    }
    resetForm()
    await loadRecords()
  } catch (error) {
    errorMessage.value = `Não foi possível salvar a experiência: ${getErrorMessage(error)}`
  } finally {
    isSaving.value = false
  }
}

async function deleteRecord(record: AdminExperience) {
  const linkedItems = record.testimonials?.length ?? 0
  const warning = linkedItems
    ? ` Esta ação também removerá ${linkedItems} depoimento(s) associado(s).`
    : ''
  if (!window.confirm(`Excluir a experiência em "${record.company}"?${warning}`)) return

  deletingId.value = record.id
  errorMessage.value = ''
  successMessage.value = ''
  try {
    await $fetch(`/api/dev-admin/experiences/${record.id}`, { method: 'DELETE' })
    if (editingId.value === record.id) resetForm()
    successMessage.value = 'Experiência excluída.'
    await loadRecords()
  } catch (error) {
    errorMessage.value = `Não foi possível excluir a experiência: ${getErrorMessage(error)}`
  } finally {
    deletingId.value = null
  }
}

onMounted(loadRecords)
</script>