<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

const { data: portfolio } = usePortfolio()

const PAGE_SIZE = 12

const search = ref('')
const selectedCategory = ref('Todos')
const selectedLevel = ref('Todos')
const currentPage = ref(1)

const technologyIcons: Record<string, string> = {
  HTML: 'logos:html-5',
  CSS: 'logos:css-3',
  Sass: 'logos:sass',
  SCSS: 'logos:sass',

  JavaScript: 'logos:javascript',
  TypeScript: 'logos:typescript-icon',

  Vue: 'logos:vue',
  VueJS: 'logos:vue',
  Nuxt: 'logos:nuxt-icon',
  NuxtJS: 'logos:nuxt-icon',

  React: 'logos:react',
  Angular: 'logos:angular-icon',
  NextJS: 'logos:nextjs-icon',
  Quasar: 'logos:quasar',
  Tailwind: 'logos:tailwindcss-icon',

  Node: 'logos:nodejs-icon',
  NodeJS: 'logos:nodejs-icon',
  NestJS: 'logos:nestjs',
  Express: 'simple-icons:express',
  Fastify: 'logos:fastify',

  PostgreSQL: 'logos:postgresql',
  MySQL: 'logos:mysql',
  Prisma: 'logos:prisma',
  Redis: 'logos:redis',

  Docker: 'logos:docker-icon',
  Git: 'logos:git-icon',
  GitHub: 'logos:github-icon',
  GitLab: 'logos:gitlab',

  AWS: 'logos:aws',
  Vercel: 'logos:vercel-icon',

  Jest: 'logos:jest',
  Cypress: 'logos:cypress-icon',
  Playwright: 'logos:playwright',

  Python: 'logos:python',
  Django: 'logos:django-icon',
  Vite: 'logos:vitejs',

  Java: 'logos:java',
  'Spring Boot': 'logos:spring-icon',

  PHP: 'logos:php',
  Laravel: 'logos:laravel',

  Go: 'logos:go',
}

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Banco de dados',
  cloud: 'Cloud',
  devops: 'DevOps & Cloud',
  architecture: 'Arquitetura',
  testing: 'Testes',
  other: 'Outros',
}

const levelLabels: Record<string, string> = {
  BASIC: 'Básico',
  INTERMEDIATE: 'Intermediário',
  ADVANCED: 'Avançado',
}

function normalizeTechnologyName(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function getTechnologyIcon(name: string, fallback: string | null) {
  if (technologyIcons[name]) {
    return technologyIcons[name]
  }

  const normalizedName = normalizeTechnologyName(name)

  const match = Object.entries(technologyIcons).find(
    ([technologyName]) =>
      normalizeTechnologyName(technologyName) === normalizedName,
  )

  return match?.[1] ?? fallback ?? 'carbon:code'
}

function getCategoryLabel(category: string) {
  return categoryLabels[category.toLowerCase()] ?? category
}

function getLevelLabel(level: string | null) {
  if (!level) {
    return ''
  }

  return levelLabels[level] ?? level
}

const categories = computed(() => {
  const technologies = portfolio.value?.technologies ?? []

  const uniqueCategories = [
    ...new Set(
      technologies
        .map((technology) => technology.category)
        .filter(Boolean),
    ),
  ]

  return ['Todos', ...uniqueCategories]
})

const levels = computed(() => {
  const technologies = portfolio.value?.technologies ?? []

  const uniqueLevels = [
    ...new Set(
      technologies
        .map((technology) => technology.level)
        .filter(Boolean),
    ),
  ]

  return ['Todos', ...uniqueLevels]
})

const levelOptions = computed(() => [
  { label: 'Todos os níveis', value: 'Todos' },
  ...levels.value
    .filter((level) => level !== 'Todos')
    .map((level) => ({
      label: levelLabels[level] ?? level,
      value: level,
    })),
])

const filteredTechnologies = computed(() => {
  const technologies = portfolio.value?.technologies ?? []

  const term = (search.value ?? '').trim().toLowerCase()

  const filtered = technologies.filter((technology) => {
    const matchesSearch =
      !term ||
      technology.name.toLowerCase().includes(term) ||
      technology.category.toLowerCase().includes(term)

    const matchesCategory =
      selectedCategory.value === 'Todos' ||
      technology.category === selectedCategory.value

    const matchesLevel =
      selectedLevel.value === 'Todos' ||
      technology.level === selectedLevel.value

    return matchesSearch && matchesCategory && matchesLevel
  })

  return [...filtered].sort((a, b) => {
    if (a.featured && !b.featured) {
      return -1
    }

    if (!a.featured && b.featured) {
      return 1
    }

    return (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  })
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredTechnologies.value.length / PAGE_SIZE)),
)

const paginatedTechnologies = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE

  return filteredTechnologies.value.slice(start, start + PAGE_SIZE)
})

watch([search, selectedCategory, selectedLevel], () => {
  currentPage.value = 1
})
</script>

<template>
  <q-section
    id="tecnologias"
    class="q-py-xl"
  >
    <div class="wrapper">
      <!-- Cabeçalho -->
      <div class="row items-end justify-between q-col-gutter-xl q-mb-xl">
        <div class="col-12 col-md-7">
          <div class="text-overline text-primary text-weight-bold">
            Stack tecnológica
          </div>

          <div class="text-h3 text-weight-bold">
            Tecnologias e ferramentas
          </div>

          <div class="text-body1 text-grey-7 q-mt-md">
            Tecnologias e ferramentas que fazem parte da minha experiência
            profissional e dos projetos que desenvolvo.
          </div>
        </div>

        <div class="col-12 col-md-auto">
          <div class="text-caption text-grey-6">
            {{ filteredTechnologies.length }} tecnologias
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <q-card
        flat
        bordered
        class="technology-toolbar q-mb-xl"
      >
        <q-card-section class="q-pa-md">
          <div class="row items-center q-col-gutter-md">
            <!-- Busca -->
            <div class="col-12 col-md-4">
              <q-input
                v-model="search"
                outlined
                dense
                clearable
                placeholder="Buscar tecnologia..."
                aria-label="Buscar tecnologia"
                @clear="search = ''"
              >
                <template #prepend>
                  <q-icon name="mdi-magnify" />
                </template>
              </q-input>
            </div>

            <!-- Nível -->
            <div class="col-12 col-md-auto">
              <q-select
                v-model="selectedLevel"
                :options="levelOptions"
                outlined
                dense
                emit-value
                map-options
                class="level-select"
                aria-label="Filtrar por nível"
              />
            </div>

            <!-- Categorias -->
            <div class="col-12 col-md">
              <q-scroll-area
                horizontal
                class="category-scroll"
              >
                <div class="row no-wrap q-gutter-sm">
                  <q-btn
                    v-for="category in categories"
                    :key="category"
                    :label="getCategoryLabel(category)"
                    :outline="selectedCategory !== category"
                    :unelevated="selectedCategory === category"
                    :color="
                      selectedCategory === category
                        ? 'primary'
                        : 'grey-7'
                    "
                    no-caps
                    dense
                    class="category-btn"
                    @click="selectedCategory = category"
                  />
                </div>
              </q-scroll-area>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Tecnologias -->
      <div
        v-if="paginatedTechnologies.length"
        class="row q-col-gutter-md"
      >
        <div
          v-for="technology in paginatedTechnologies"
          :key="technology.id"
          class="col-4 col-sm-3 col-md-2"
        >
          <q-card
            flat
            bordered
            class="technology-card full-height"
          >
            <q-card-section class="technology-card-content">
              <!-- Ícone -->
              <div class="flex flex-center">
                <div class="technology-icon-wrapper">
                  <Icon
                    :icon="
                      getTechnologyIcon(
                        technology.name,
                        technology.icon,
                      )
                    "
                    width="48"
                    height="48"
                  />
                </div>
              </div>

              <!-- Nome + Categoria -->
              <div class="row justify-between items-center no-wrap q-mt-sm">
                <span
                  class="text-subtitle2 text-weight-bold ellipsis"
                  :title="technology.name"
                >
                  {{ technology.name }}
                </span>

                <span class="text-caption text-grey-6 no-wrap q-ml-xs">
                  {{ getCategoryLabel(technology.category) }}
                </span>
              </div>

              <!-- Nível + Destaque -->
              <div class="row justify-between items-center q-mt-xs">
                <span class="text-caption text-grey-5">
                  {{ getLevelLabel(technology.level) }}
                </span>

                <q-badge
                  v-if="technology.featured"
                  outline
                  color="primary"
                  label="Principal"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Nenhum resultado -->
      <q-card
        v-else
        flat
        bordered
      >
        <q-card-section class="text-center q-pa-xl">
          <q-icon
            name="mdi-magnify-close"
            size="48px"
            color="grey-6"
          />

          <div class="text-h6 q-mt-md">
            Nenhuma tecnologia encontrada
          </div>

          <div class="text-body2 text-grey-6 q-mt-sm">
            Tente alterar a busca ou os filtros de categoria e nível.
          </div>

          <q-btn
            v-if="
              search ||
              selectedCategory !== 'Todos' ||
              selectedLevel !== 'Todos'
            "
            flat
            color="primary"
            label="Limpar filtros"
            no-caps
            class="q-mt-md"
            @click="
              search = '';
              selectedCategory = 'Todos';
              selectedLevel = 'Todos'
            "
          />
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
  </q-section>
</template>

<style scoped>
.technology-toolbar {
  border-radius: 12px;
}

.category-scroll {
  max-width: 100%;
}

.category-btn {
  border-radius: 8px;
}

.level-select {
  min-width: 190px;
}

.technology-card {
  border-radius: 12px;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.technology-card:hover {
  transform: translateY(-4px);
  border-color: var(--q-primary);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.technology-card-content {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.technology-icon-wrapper {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.04);
}

@media (max-width: 599px) {
  .technology-card-content {
    min-height: 130px;
  }

  .technology-icon-wrapper {
    width: 48px;
    height: 48px;
  }
}
</style>
