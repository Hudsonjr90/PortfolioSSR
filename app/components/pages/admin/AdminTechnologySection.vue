<template>
  <section>
    <div class="row items-center justify-between q-mb-md">
      <div>
        <h2 class="text-h5 q-my-none">Stack tecnológica</h2>
        <div class="text-caption text-grey-5">Gerencie tecnologias, níveis e destaques.</div>
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
            <div class="text-h6">{{ editingId ? 'Editar tecnologia' : 'Nova tecnologia' }}</div>
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
                v-model="form.name"
                outlined
                dense
                label="Nome"
                maxlength="100"
                required
              />
              <q-select
                v-model="form.category"
                :options="categoryOptions"
                outlined
                emit-value
                map-options
                label="Categoria"
                required
              />
              <q-select
                v-model="form.icon"
                :options="filteredTechnologyIconOptions"
                outlined
                dense
                clearable
                use-input
                input-debounce="0"
                new-value-mode="add-unique"
                emit-value
                map-options
                label="Ícone (opcional)"
                hint="Escolha um ícone definido ou informe um identificador Iconify."
                @filter="filterTechnologyIcons"
              >
                <template #option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <Icon :icon="scope.opt.value" width="24" height="24" />
                    </q-item-section>
                    <q-item-section>{{ scope.opt.label }}</q-item-section>
                  </q-item>
                </template>
                <template #selected-item="scope">
                  <div class="row items-center no-wrap q-gutter-sm">
                    <Icon v-if="scope.opt.value" :icon="scope.opt.value" width="20" height="20" />
                    <span>{{ scope.opt.label }}</span>
                  </div>
                </template>
                <template #append>
                  <Icon
                    v-if="form.icon && !technologyIconOptions.some((option) => option.value === form.icon)"
                    :icon="form.icon"
                    width="20"
                    height="20"
                  />
                </template>
              </q-select>
              <q-select
                v-model="form.level"
                :options="levelOptions"
                outlined
                emit-value
                map-options
                label="Nível"
                required
              />
              <q-input
                v-model.number="form.sortOrder"
                outlined
                dense
                type="number"
                min="0"
                label="Ordem de exibição"
              />
              <q-toggle v-model="form.featured" color="primary" label="Destacar na stack" />
              <div class="row q-gutter-sm">
                <q-btn
                  type="submit"
                  color="primary"
                  :label="editingId ? 'Salvar alterações' : 'Cadastrar tecnologia'"
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
          <q-spinner color="primary" size="40px" aria-label="Carregando tecnologias" />
        </div>
        <div v-else-if="!records.length" class="text-body2 q-pa-md">
          Nenhuma tecnologia cadastrada.
        </div>
        <div v-else class="column q-gutter-md">
          <q-card
            v-for="record in paginatedRecords"
            :key="record.id"
            flat
            bordered
            class="admin-panel"
          >
            <q-card-section class="row items-center no-wrap q-gutter-md">
              <Icon
                :icon="getTechnologyIcon(record.name, record.icon)"
                width="28"
                height="28"
                aria-hidden="true"
              />
              <div class="col">
                <div class="text-subtitle1 text-weight-bold">{{ record.name }}</div>
                <div class="text-caption text-grey-5">
                  {{ categoryLabels[record.category] }} · {{ levelLabels[record.level] }} · ordem
                  {{ record.sortOrder }}
                </div>
                <div class="row q-gutter-xs q-mt-xs">
                  <q-badge
                    :color="record.featured ? 'primary' : 'grey-7'"
                    :label="record.featured ? 'Destaque' : 'Normal'"
                  />
                  <q-badge
                    v-if="record.experiences?.length"
                    outline
                    color="primary"
                    :label="`${record.experiences.length} experiência(s)`"
                  />
                </div>
              </div>
              <div class="row no-wrap">
                <q-btn
                  flat
                  dense
                  round
                  color="primary"
                  icon="mdi-pencil"
                  :aria-label="`Editar ${record.name}`"
                  @click="editRecord(record)"
                />
                <q-btn
                  flat
                  dense
                  round
                  color="negative"
                  icon="mdi-delete"
                  :aria-label="`Excluir ${record.name}`"
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
            aria-label="Paginação das tecnologias"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import type {
  AdminTechnology,
  TechnologyCategory,
  TechnologyLevel,
} from '#shared/types/admin-records'
import { useAdminPagination } from '~/composables/useAdminPagination'
import {
  getTechnologyIcon,
  technologyIconOptions,
} from '~/utils/technology-icons'

interface TechnologyIconOption {
  label: string
  value: string
}

interface TechnologyForm {
  name: string
  category: TechnologyCategory
  icon: string
  sortOrder: number
  featured: boolean
  level: TechnologyLevel
}

const categoryLabels: Record<TechnologyCategory, string> = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  DATABASE: 'Banco de dados',
  DEVOPS: 'DevOps',
  TESTING: 'Testes',
  OTHER: 'Outros',
  DESIGN: 'Design',
  AI: 'Inteligência artificial',
}

const levelLabels: Record<TechnologyLevel, string> = {
  BASIC: 'Básico',
  INTERMEDIATE: 'Intermediário',
  ADVANCED: 'Avançado',
  ESPECIALIST: 'Especialista',
}

const categoryOptions = Object.entries(categoryLabels).map(([value, label]) => ({
  value,
  label,
}))
const levelOptions = Object.entries(levelLabels).map(([value, label]) => ({
  value,
  label,
}))
const filteredTechnologyIconOptions = ref<TechnologyIconOption[]>(technologyIconOptions)

function filterTechnologyIcons(
  value: string,
  update: (callback: () => void) => void,
) {
  update(() => {
    const searchTerm = value.toLowerCase()
    filteredTechnologyIconOptions.value = technologyIconOptions.filter(
      (option) =>
        option.label.toLowerCase().includes(searchTerm) ||
        option.value.toLowerCase().includes(searchTerm),
    )
  })
}

function emptyForm(): TechnologyForm {
  return {
    name: '',
    category: 'OTHER',
    icon: '',
    sortOrder: 0,
    featured: false,
    level: 'INTERMEDIATE',
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

const records = ref<AdminTechnology[]>([])
const { currentPage, totalPages, paginatedRecords } = useAdminPagination(records)
const form = reactive<TechnologyForm>(emptyForm())
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

function editRecord(record: AdminTechnology) {
  editingId.value = record.id
  Object.assign(form, {
    name: record.name,
    category: record.category,
    icon: getTechnologyIcon(record.name, record.icon),
    sortOrder: record.sortOrder,
    featured: record.featured,
    level: record.level,
  })
  errorMessage.value = ''
  successMessage.value = ''
}

async function loadRecords() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    records.value = await $fetch<AdminTechnology[]>('/api/dev-admin/technology')
  } catch (error) {
    errorMessage.value = `Não foi possível carregar as tecnologias: ${getErrorMessage(error)}`
  } finally {
    isLoading.value = false
  }
}

async function saveRecord() {
  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''
  const body = { ...form, icon: form.icon || null }

  try {
    if (editingId.value) {
      await $fetch(`/api/dev-admin/technology/${editingId.value}`, { method: 'PUT', body })
      successMessage.value = 'Tecnologia atualizada.'
    } else {
      await $fetch('/api/dev-admin/technology', { method: 'POST', body })
      successMessage.value = 'Tecnologia cadastrada.'
    }
    resetForm()
    await loadRecords()
  } catch (error) {
    errorMessage.value = `Não foi possível salvar a tecnologia: ${getErrorMessage(error)}`
  } finally {
    isSaving.value = false
  }
}

async function deleteRecord(record: AdminTechnology) {
  if (!window.confirm(`Excluir a tecnologia "${record.name}"?`)) return

  deletingId.value = record.id
  errorMessage.value = ''
  successMessage.value = ''
  try {
    await $fetch(`/api/dev-admin/technology/${record.id}`, { method: 'DELETE' })
    if (editingId.value === record.id) resetForm()
    successMessage.value = 'Tecnologia excluída.'
    await loadRecords()
  } catch (error) {
    errorMessage.value = `Não foi possível excluir a tecnologia: ${getErrorMessage(error)}`
  } finally {
    deletingId.value = null
  }
}

onMounted(loadRecords)
</script>
