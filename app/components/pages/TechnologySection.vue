<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

const { data: portfolio } = usePortfolio()

const { techPageSize } = useMobile()


const search = ref('')
const selectedCategory = ref('Todas')
const selectedLevel = ref('Todos')
const currentPage = ref(1)

const technologyIcons: Record<string, string> = {
  // Frontend
  HTML: 'logos:html-5',
  CSS: 'logos:css-3',
  JavaScript: 'logos:javascript',
  Angular: 'logos:angular-icon',
  React: 'logos:react',
  Vue: 'logos:vue',
  Bootstrap: 'devicon:bootstrap',
  TypeScript: 'logos:typescript-icon',
  Sass: 'logos:sass',
  Less: 'logos:less',
  Redux: 'logos:redux',
  Pinia: 'logos:pinia',
  Vuetify: 'logos:vuetifyjs',
  Tailwind: 'logos:tailwindcss-icon',
  Material: 'logos:material-ui',
  GraphQL: 'logos:graphql',
  Webpack: 'logos:webpack',
  'Next.js': 'logos:nextjs-icon',
  Nuxt: 'logos:nuxt-icon',
  Quasar: 'devicon-plain:quasar',
  Vite: 'logos:vitejs',
  jQuery: 'devicon:jquery',
  Svelte: 'logos:svelte-icon',

  // Backend
  Node: 'logos:nodejs-icon',
  NodeJS: 'logos:nodejs-icon',
  Express: 'simple-icons:express',
  Fastify: 'devicon-plain:fastify',
  PHP: 'logos:php',
  Python: 'logos:python',
  Django: 'logos:django-icon',
  Java: 'logos:java',
  'Spring Boot': 'logos:spring-icon',
  Laravel: 'logos:laravel',
  'C#': 'logos:c-sharp',
  '.NET': 'logos:dotnet',
  Ruby: 'logos:ruby',
  'Ruby on Rails': 'logos:rails',
  Go: 'logos:go',
  NestJS: 'logos:nestjs',
  Prisma: 'material-icon-theme:prisma',
  Swagger: 'logos:swagger',
  gRPC: 'devicon:grpc',

  // Database
  PostgreSQL: 'logos:postgresql',
  MySQL: 'logos:mysql',
  MongoDB: 'skill-icons:mongodb',
  Firebase: 'devicon:firebase',
  Redis: 'logos:redis',

  // DevOps & Cloud
  Docker: 'logos:docker-icon',
  AWS: 'fa-brands:aws',
  Vercel: 'skill-icons:vercel-light',
  Netlify: 'selfhst:netlify',
  Heroku: 'skill-icons:heroku',
  Jenkins: 'logos:jenkins',
  Terraform: 'devicon:terraform',
  Ansible: 'logos:ansible',
  Kubernetes: 'logos:kubernetes',

  // Testing
  Jest: 'logos:jest',
  Jasmine: 'logos:jasmine',
  Cypress: 'devicon-plain:cypressio',
  Playwright: 'logos:playwright',

  // Versionamento / ferramentas
  Git: 'logos:git-icon',
  GitHub: 'akar-icons:github-fill',
  Gitlab: 'devicon:gitlab',
  npm: 'devicon:npm-wordmark',
  NPM: 'devicon:npm-wordmark',
  Yarn: 'material-icon-theme:yarn',
  Jira: 'logos:jira',
  Markdown: 'cib:markdown',
  Electron: 'logos:electron',
  Postman: 'skill-icons:postman',
  Thunderclient: 'carbon:thunderstorm',
  ESLint: 'logos:eslint',
  Magento: 'logos:magento',
  RubyMine: 'simple-icons:rubymine',
  'VS Code': 'logos:visual-studio-code',
  'IntelliJ IDEA': 'logos:intellij-idea',
  Android: 'logos:android-icon',
  DBeaver: 'devicon:dbeaver',
  ECharts: 'thesvg-color:apache-echarts',
  Eclipse: 'devicon:eclipse',
  Insomnia: 'logos:insomnia',
  GoLand: 'logos:goland',

  // Design
  Figma: 'logos:figma',
  Photoshop: 'logos:adobe-photoshop',
  Sketch: 'logos:sketch',
  'Adobe XD': 'logos:adobe-xd',

  // Outros
  Wordpress: 'skill-icons:wordpress',
  Shopify: 'logos:shopify',
  Analytics: 'logos:google-analytics',
  ADS: 'logos:google-ads',

  // IA
  Cursor: 'simple-icons:cursor',
  Codex: 'carbon:ai-label',
  Claude: 'simple-icons:claude',
  Gemini: 'logos:google-gemini',
  DeepSeek: 'simple-icons:deepseek',
  ChatGPT: 'simple-icons:openai',
  Copilot: 'devicon:githubcopilot',
  OpenClaw: 'carbon:bot',
}

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  testing: 'Testes',
  other: 'Ferramentas',
  design: 'Design',
  ai: 'IA',
}

const levelLabels: Record<string, string> = {
  BASIC: 'Básico',
  INTERMEDIATE: 'Intermediário',
  ADVANCED: 'Avançado',
  ESPECIALIST: 'Especialista',
}

const levelColors: Record<string, string> = {
  BASIC: 'red-4',
  INTERMEDIATE: 'yellow-7',
  ADVANCED: 'green-7',
  ESPECIALIST: 'blue-7',
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

function getLevelColor(level: string | null) {
  if (!level) {
    return 'grey-7'
  }

  return levelColors[level] ?? 'grey-7'
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

  return ['Todas', ...uniqueCategories]
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
  ...levels.value.map((level) => ({
      label: levelLabels[level] ?? level,
      value: level,
  })),
])

const categoryOptions = computed(() => [
  ...categories.value.map((category) => ({
      label: getCategoryLabel(category),
      value: category,
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
      selectedCategory.value === 'Todas' ||
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
  Math.max(
    1,
    Math.ceil(
      filteredTechnologies.value.length / techPageSize.value,
    ),
  ),
)

const paginatedTechnologies = computed(() => {
  const start =
    (currentPage.value - 1) * techPageSize.value

  return filteredTechnologies.value.slice(
    start,
    start + techPageSize.value,
  )
})

watch(
  [search, selectedCategory, selectedLevel],
  () => {
    currentPage.value = 1
  },
)
</script>

<template>
  <section
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

          <div class="text-body1 q-mt-md">
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
        class="technology-toolbar q-mb-xl bg-transparent"
      >
        <q-card-section class="q-pa-md">
          <div class="row items-center q-col-gutter-md justify-between ">
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
                class="search-input"
              >
                <template #prepend>
                  <q-icon name="mdi-magnify" />
                </template>
              </q-input>
            </div>

            <!-- Nível -->
            <div class="col-12 col-md-auto row">
              <q-select
                v-model="selectedLevel"
                :options="levelOptions"
                outlined
                dense
                emit-value
                map-options
                prefix="Nível:"
                class="level-select q-mr-md"
                aria-label="Filtrar por nível"
              />

              <q-select
                v-model="selectedCategory"
                :options="categoryOptions"
                outlined
                dense
                emit-value
                map-options
                prefix="Categoria:"
                class="category-select"
                aria-label="Filtrar por categoria"
              />
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
          class="col-6 col-sm-4 col-md-3 col-lg-2"
        >
          <q-card
            flat
            bordered
            class="technology-card full-height bg-transparent"
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

                <span
                  class="text-caption text-grey-6 no-wrap q-ml-xs"
                >
                  {{ getCategoryLabel(technology.category) }}
                </span>
              </div>

              <!-- Nível -->
              <div class="row justify-center items-center q-mt-xs">
                <q-badge
                  :color="getLevelColor(technology.level)"
                  outline
                  :label="getLevelLabel(technology.level)"
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
              selectedCategory !== 'Todas' ||
              selectedLevel !== 'Todos'
            "
            flat
            color="primary"
            label="Limpar filtros"
            no-caps
            class="q-mt-md"
            @click="
              search = '';
              selectedCategory = 'Todas';
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
  </section>
</template>

<style scoped>
.technology-toolbar {
  border-radius: 12px;
}

.level-select {
  min-width: 190px;
}

.category-select {
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

@media screen and (max-width: 480px) {
  .category-select {
    min-width: 165px;
  }
  .level-select {
    min-width: 165px;
  }
}

</style>