<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const { data: portfolio } = usePortfolio()

const { pageSize, isMobile } = useMobile()

const totalPages = computed(() =>
  Math.max(
    1,
    Math.ceil(
      sortedEducation.value.length / pageSize.value,
    ),
  ),
)

const paginatedEducation = computed(() => {
  const start =
    (currentPage.value - 1) * pageSize.value

  return sortedEducation.value.slice(
    start,
    start + pageSize.value,
  )
})

const currentPage = ref(1)
const previewImage = ref<string | null>(null)
const previewTitle = ref('')
const previewDialog = ref(false)

interface EducationAsset {
  image: string
  pdf: string
  institution: string
  type: string
  category: string
  year?: string
}

const educationAssets: Record<string, EducationAsset> = {
  'Mestrado em Ciência da Computação': {
    image: '/images/education/harvard.webp',
    pdf: '/images/education-pdf/harvard.pdf',
    institution: 'Universidade de Harvard',
    type: 'Mestrado',
    category: 'Acadêmico',
    year: '2023',
  },

  'Pós-graduação em Engenharia de Software': {
    image: '/images/education/mba.webp',
    pdf: '/images/education-pdf/mba.pdf',
    institution: 'Faculdade Única de MG',
    type: 'Pós-graduação',
    category: 'Acadêmico',
  },

  'Graduação em Processos Gerenciais': {
    image: '/images/education/estacio.webp',
    pdf: '/images/education-pdf/processos-gerenciais.pdf',
    institution: 'Faculdade Estácio de Sá',
    type: 'Graduação',
    category: 'Acadêmico',
  },

  'Bootcamp Desenvolvimento Frontend com Angular': {
    image: '/images/education/bootcamp.webp',
    pdf: '/images/education-pdf/bootcamp.pdf',
    institution: 'Digital Innovation One · Banco Pan',
    type: 'Bootcamp',
    category: 'Técnico',
  },

  'AEM Front-end Developer': {
    image: '/images/education/aem-front.webp',
    pdf: '/images/education-pdf/aem-frontend.pdf',
    institution: 'Adobe Professional',
    type: 'Curso',
    category: 'Técnico',
  },

  'AEM Sites Business Practitioner': {
    image: '/images/education/aem-sbp.webp',
    pdf: '/images/education-pdf/aem-sbp.pdf',
    institution: 'Adobe Professional',
    type: 'Curso',
    category: 'Técnico',
  },

  'Vue.js do Básico ao Avançado': {
    image: '/images/education/vuejs.webp',
    pdf: '/images/education-pdf/vuejs.pdf',
    institution: 'VueJS Brasil',
    type: 'Curso',
    category: 'Técnico',
  },

  'JavaScript e TypeScript do Básico ao Avançado': {
    image: '/images/education/udemy.webp',
    pdf: '/images/education-pdf/javascript-typescript.pdf',
    institution: 'Udemy',
    type: 'Curso',
    category: 'Técnico',
  },

  'Trabalhando com Componentes em React': {
    image: '/images/education/dio-comp.webp',
    pdf: '/images/education-pdf/componentes-react.pdf',
    institution: 'Digital Innovation One',
    type: 'Curso',
    category: 'Técnico',
  },

  'Arquitetura de Componentes no Frontend': {
    image: '/images/education/dio-arq.webp',
    pdf: '/images/education-pdf/arquitetura-componentes.pdf',
    institution: 'Digital Innovation One',
    type: 'Curso',
    category: 'Técnico',
  },

  'Lógica de Programação Essencial': {
    image: '/images/education/dio-log.webp',
    pdf: '/images/education-pdf/logica-programacao.pdf',
    institution: 'Digital Innovation One',
    type: 'Curso',
    category: 'Técnico',
  },

  'JavaScript ES6 Essencial': {
    image: '/images/education/dio-es6.webp',
    pdf: '/images/education-pdf/javascript-es6.pdf',
    institution: 'Digital Innovation One',
    type: 'Curso',
    category: 'Técnico',
  },

  'Técnicas Avançadas em Angular 8': {
    image: '/images/education/dio-ang8.webp',
    pdf: '/images/education-pdf/angular8.pdf',
    institution: 'Digital Innovation One',
    type: 'Curso',
    category: 'Técnico',
  },

  'Testes Automatizados com Cypress': {
    image: '/images/education/testes.webp',
    pdf: '/images/education-pdf/testes-automatizados.pdf',
    institution: 'Digital Innovation One',
    type: 'Curso',
    category: 'Técnico',
  },

  'Diretivas e Propriedades de Componentes Vue.js': {
    image: '/images/education/dio-vue1.webp',
    pdf: '/images/education-pdf/diretivas-vue.pdf',
    institution: 'Digital Innovation One',
    type: 'Curso',
    category: 'Técnico',
  },

  'Componentes, Métodos e Ciclo de Vida com Vue.js': {
    image: '/images/education/dio-vue2.webp',
    pdf: '/images/education-pdf/componentes-vue.pdf',
    institution: 'Digital Innovation One',
    type: 'Curso',
    category: 'Técnico',
  },

  'Segurança Digital': {
    image: '/images/education/fgv.webp',
    pdf: '/images/education-pdf/seguranca-digital.pdf',
    institution: 'Fundação Getúlio Vargas',
    type: 'Curso',
    category: 'Técnico',
  },

  'Gestão Financeira': {
    image: '/images/education/sebrae-GF.webp',
    pdf: '/images/education-pdf/gestao-financeira.pdf',
    institution: 'Sebrae',
    type: 'Curso',
    category: 'Negócio',
  },

  'Customer Success': {
    image: '/images/education/sebrae-CS.webp',
    pdf: '/images/education-pdf/customer-success.pdf',
    institution: 'Sebrae',
    type: 'Curso',
    category: 'Negócio',
  },

  'Marketing Digital para Empreendedores': {
    image: '/images/education/sebrae-MD.webp',
    pdf: '/images/education-pdf/marketing-digital.pdf',
    institution: 'Sebrae',
    type: 'Curso',
    category: 'Negócio',
  },

  'Estratégia Financeira para Crescimento': {
    image: '/images/education/sebrae-EFC.webp',
    pdf: '/images/education-pdf/estrategia-financeira.pdf',
    institution: 'Sebrae',
    type: 'Curso',
    category: 'Negócio',
  },

  'Planejamento Estratégico': {
    image: '/images/education/sebrae-PE.webp',
    pdf: '/images/education-pdf/planejamento-estrategico.pdf',
    institution: 'Sebrae',
    type: 'Curso',
    category: 'Negócio',
  },

  'Educação Financeira Empresarial': {
    image: '/images/education/sebrae-EF.webp',
    pdf: '/images/education-pdf/educacao-financeira.pdf',
    institution: 'Sebrae',
    type: 'Curso',
    category: 'Negócio',
  },

  'Auxiliar Administrativo': {
    image: '/images/education/24h.webp',
    pdf: '/images/education-pdf/auxiliar-administrativo.pdf',
    institution: 'Cursos 24h',
    type: 'Curso',
    category: 'Administração',
  },

  'Arquiteto de Soluções IA Expert': {
    image: '/images/education/xp.webp',
    pdf: '/images/education-pdf/xp.pdf',
    institution: 'XP Educação',
    type: 'Curso',
    category: 'Técnico',
  },

  'Especialista em Microserviços Nível 2 (Domain-Driven Design)': {
    image: '/images/education/algaworks.webp',
    pdf: '/images/education-pdf/algaworks.pdf',
    institution: 'AlgaWorks',
    type: 'Curso',
    category: 'Técnico',
  },

  'Fundamentos de Análise de Dados': {
    image: '/images/education/fad.webp',
    pdf: '/images/education-pdf/fad.pdf',
    institution: 'Xperiun',
    type: 'Curso',
    category: 'Técnico',
  },

  'Fundamentos de BI e Análise de Dados': {
    image: '/images/education/biad.webp',
    pdf: '/images/education-pdf/biad.pdf',
    institution: 'Xperiun',
    type: 'Curso',
    category: 'Técnico',
  },
}

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function getAsset(course: string) {
  const direct = educationAssets[course]

  if (direct) {
    return direct
  }

  const normalizedCourse = normalize(course)

  const match = Object.entries(educationAssets).find(
    ([key]) => normalize(key) === normalizedCourse,
  )

  return match?.[1] ?? null
}

function getInstitution(course: string, fallback: string) {
  return getAsset(course)?.institution ?? fallback
}

function getType(course: string) {
  return getAsset(course)?.type ?? 'Formação'
}

function getCategory(course: string) {
  return getAsset(course)?.category ?? ''
}

const sortedEducation = computed(() => {
  return [...(portfolio.value?.education ?? [])].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  )
})

function openImage(course: string) {
  const asset = getAsset(course)

  if (!asset) {
    return
  }

  previewImage.value = asset.image
  previewTitle.value = course
  previewDialog.value = true
}

function closeImage() {
  previewDialog.value = false
  previewImage.value = null
  previewTitle.value = ''
}

watch(totalPages, (pages) => {
  if (currentPage.value > pages) {
    currentPage.value = pages
  }
})
</script>

<template>
  <section
    id="formacoes"
    class="q-py-xl"
  >
    <div class="wrapper">
      <!-- Cabeçalho -->
      <div class="q-mb-xl">
        <div class="text-overline text-primary text-weight-bold">
          Formação acadêmica
        </div>

        <div class="text-weight-bold" :class="isMobile ? 'text-h4' : 'text-h3'">
          Educação e aprendizado contínuo
        </div>

        <div class="text-body1 q-mt-md">
          Minha trajetória reúne formação acadêmica, especializações,
          bootcamps e cursos voltados ao desenvolvimento de software,
          arquitetura, negócios e tecnologia.
        </div>
      </div>

      <!-- Formações -->
      <div
        v-if="paginatedEducation.length"
        class="row q-col-gutter-lg"
      >
        <div
          v-for="education in paginatedEducation"
          :key="education.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <q-card
            flat
            bordered
            class="education-card full-height bg-transparent"
          >
            <!-- Imagem -->
            <button
              v-if="getAsset(education.course)"
              type="button"
              class="education-image-button"
              :aria-label="`Visualizar certificado de ${education.course}`"
              @click="openImage(education.course)"
            >
              <q-img
                :src="getAsset(education.course)?.image"
                :alt="`${education.course} - ${getInstitution(
                  education.course,
                  education.institution,
                )}`"
                fit="cover"
                class="education-image"
              />

              <div class="education-image-overlay">
                <q-icon
                  name="mdi-magnify-plus-outline"
                  size="30px"
                />

                <span>Visualizar</span>
              </div>
            </button>

            <div
              v-else
              class="education-image-placeholder flex flex-center"
            >
              <q-icon
                name="mdi-school-outline"
                size="64px"
                color="primary"
              />
            </div>

            <!-- Conteúdo -->
            <q-card-section class="education-content">
              <!-- Instituição -->
              <div class="text-caption text-primary text-weight-bold">
                {{
                  getInstitution(
                    education.course,
                    education.institution,
                  )
                }}
              </div>

              <!-- Curso -->
              <div class="text-h6 text-weight-bold q-mt-xs">
                {{ education.course }}
              </div>

              <!-- Metadados -->
              <div class="row items-center q-gutter-xs q-mt-md">
                <q-badge
                  outline
                  color="primary"
                  :label="getType(education.course)"
                />

                <q-badge
                  v-if="getCategory(education.course)"
                  outline
                  color="primary"
                  :label="getCategory(education.course)"
                />
              </div>
            </q-card-section>

            <!-- Ações -->
            <q-separator />

            <q-card-actions
              class="justify-between q-px-md q-py-sm q-mb-md q-mt-md"
            >
              <div class="text-caption text-grey-6">
                {{ getType(education.course) }}
              </div>

              <a
                v-if="getAsset(education.course)?.pdf"
                :href="getAsset(education.course)?.pdf"
                :download="`${education.course}.pdf`"
                class="education-download"
              >
                <q-icon
                  name="mdi-file-download-outline"
                  size="18px"
                />

                <span>Certificado</span>
              </a>
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <!-- Sem formações -->
      <q-card
        v-else
        flat
        bordered
      >
        <q-card-section class="text-center q-pa-xl">
          <q-icon
            name="mdi-school-outline"
            size="56px"
            color="grey-5"
          />

          <div class="text-h6 q-mt-md">
            Nenhuma formação cadastrada
          </div>
        </q-card-section>
      </q-card>

      <!-- Paginação -->
      <div
        v-if="totalPages > 1"
        class="row justify-center q-mt-xl"
      >
        <q-pagination
          v-model="currentPage"
          :max="totalPages"
          :max-pages="7"
          boundary-numbers
          direction-links
          color="primary"
        />
      </div>
    </div>

    <!-- Preview do certificado -->
    <q-dialog
      v-model="previewDialog"
      maximized
      @hide="closeImage"
    >
      <q-card class="education-preview">
        <q-bar class="education-preview-header">
          <div class="ellipsis">
            {{ previewTitle }}
          </div>

          <q-space />

          <q-btn
            flat
            round
            dense
            icon="mdi-close"
            aria-label="Fechar"
            @click="closeImage"
          />
        </q-bar>

        <q-card-section class="education-preview-content">
          <q-img
            v-if="previewImage"
            :src="previewImage"
            :alt="previewTitle"
            fit="contain"
            class="education-preview-image"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </section>
</template>

<style scoped>
.education-card {
  overflow: hidden;
  border-radius: 16px;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.education-card:hover {
  transform: translateY(-4px);
  border-color: var(--q-primary);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.education-image-button {
  position: relative;
  display: block;
  width: 100%;
  height: 240px;
  padding: 0;
  border: 0;
  overflow: hidden;
  cursor: zoom-in;
  background: transparent;
}

.education-image {
  width: 100%;
  height: 100%;
}

.education-image-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: white;
  background: rgba(0, 0, 0, 0.48);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.education-image-button:hover .education-image-overlay {
  opacity: 1;
}

.education-image-placeholder {
  width: 100%;
  height: 240px;
  background: rgba(0, 0, 0, 0.025);
}

.education-content {
  min-height: 160px;
}

.education-description {
  line-height: 1.6;
}

.education-download {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--q-primary);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.education-download:hover {
  opacity: 0.75;
}

.education-preview {
  width: 100%;
  height: 100%;
}

.education-preview-header {
  background: transparent;
}

.education-preview-content {
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.education-preview-image {
  width: 100%;
  height: 100%;
}

@media (max-width: 599px) {
  .education-image-button,
  .education-image-placeholder {
    height: 210px;
  }

  .education-content {
    min-height: auto;
  }
}
</style>