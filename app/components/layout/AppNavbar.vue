<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'
import logo from '/logo.png'

const {
  isDark,
  isReady: isThemeReady,
  toggleTheme,
} = useTheme()
const { isMobile } = useMobile()

const activeSection = ref<string | null>(null)

const isMobileMenuOpen = ref(false)

const themeIcon = computed(() => {
  if (!isThemeReady.value || isDark.value) {
    return 'mdi-weather-sunny'
  }

  return 'mdi-weather-night'
})

const themeLabel = computed(() => {
  return isDark.value
    ? 'Ativar tema claro'
    : 'Ativar tema escuro'
})

const sections = [
  {
    id: 'sobre',
    label: 'Sobre',
    icon: 'mdi-information-outline',
  },
  {
    id: 'formacoes',
    label: 'Formações',
    icon: 'mdi-school-outline',
  },
  {
    id: 'experiencia',
    label: 'Experiências',
    icon: 'mdi-briefcase-account-outline',
  },
  {
    id: 'depoimentos',
    label: 'Depoimentos',
    icon: 'mdi-message-text-outline',
  },
  {
    id: 'projetos',
    label: 'Projetos',
    icon: 'mdi-folder-outline',
  },
  {
    id: 'tecnologias',
    label: 'Tecnologias',
    icon: 'mdi-laptop-account',
  },
  {
    id: 'contato',
    label: 'Contato',
    icon: 'mdi-phone-outline',
  },
]

function getSectionElement(id: string) {
  return document.getElementById(id)
}

function getHeaderHeight() {
  const header = document.querySelector('.q-header') as HTMLElement | null

  return header?.offsetHeight ?? 72
}

function updateActiveSection() {
  const headerHeight = getHeaderHeight()

  const activationLine =
    window.scrollY +
    headerHeight +
    Math.min(
      180,
      window.innerHeight * 0.25,
    )

  let currentSection: string | null = null

  for (const section of sections) {
    const element = getSectionElement(section.id)

    if (!element) {
      continue
    }

    const sectionTop =
      element.getBoundingClientRect().top +
      window.scrollY

    if (sectionTop <= activationLine) {
      currentSection = section.id
    }
  }

  const documentHeight =
    document.documentElement.scrollHeight

  const viewportBottom =
    window.scrollY +
    window.innerHeight

  const reachedPageBottom =
    viewportBottom >= documentHeight - 8

  if (reachedPageBottom) {
    const contactElement =
      getSectionElement('contato')

    if (contactElement) {
      currentSection = 'contato'
    }
  }

  activeSection.value = currentSection
}

let ticking = false
let programmaticScrollTarget: string | null = null
let scrollSettlementFrame = 0

function getSectionScrollPosition(element: HTMLElement) {
  const headerHeight = getHeaderHeight()

  return Math.max(
    element.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      12,
    0,
  )
}

function waitForProgrammaticScroll(id: string) {
  programmaticScrollTarget = id

  const checkPosition = () => {
    if (programmaticScrollTarget !== id) {
      return
    }

    const element = getSectionElement(id)

    if (!element) {
      programmaticScrollTarget = null
      return
    }

    const targetPosition = getSectionScrollPosition(element)
    const reachedTarget =
      Math.abs(window.scrollY - targetPosition) <= 2

    if (reachedTarget) {
      programmaticScrollTarget = null
      activeSection.value = id
      return
    }

    scrollSettlementFrame = window.requestAnimationFrame(
      checkPosition,
    )
  }

  if (scrollSettlementFrame) {
    window.cancelAnimationFrame(scrollSettlementFrame)
  }

  scrollSettlementFrame = window.requestAnimationFrame(
    checkPosition,
  )
}

function handleScroll() {
  if (isMobile.value) {
    return
  }

  if (programmaticScrollTarget) {
    return
  }

  if (ticking) {
    return
  }

  ticking = true

  window.requestAnimationFrame(() => {
    updateActiveSection()
    ticking = false
  })
}

async function scrollToSection(id: string) {
  const element = getSectionElement(id)

  if (!element) {
    return
  }

  activeSection.value = id

  window.history.replaceState(
    null,
    '',
    `#${id}`,
  )

  isMobileMenuOpen.value = false

  await nextTick()

  window.requestAnimationFrame(() => {
    const targetElement = getSectionElement(id)

    if (!targetElement) {
      return
    }

    const targetPosition = getSectionScrollPosition(targetElement)

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: 'smooth',
    })

    waitForProgrammaticScroll(id)
  })
}

function handleLogoClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })

  activeSection.value = null

  isMobileMenuOpen.value = false

  window.history.replaceState(
    null,
    '',
    window.location.pathname,
  )

  programmaticScrollTarget = null
}

onMounted(async () => {
  await nextTick()

  window.addEventListener(
    'scroll',
    handleScroll,
    {
      passive: true,
    },
  )

  window.addEventListener(
    'resize',
    handleScroll,
    {
      passive: true,
    },
  )

  if (!isMobile.value) {
    requestAnimationFrame(() => {
      updateActiveSection()
    })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener(
    'scroll',
    handleScroll,
  )

  window.removeEventListener(
    'resize',
    handleScroll,
  )

  if (scrollSettlementFrame) {
    window.cancelAnimationFrame(scrollSettlementFrame)
  }
})
</script>

<template>
  <q-header
    bordered
    height-hint="50"
    class="bg-transparent backdrop-blur"
  >
    <q-toolbar class="wrapper q-px-md">

      <!-- Logo -->
      <q-toolbar-title class="col-auto">
        <a
          href="/"
          class="row items-center no-decoration"
          aria-label="Voltar ao início"
          @click.prevent="handleLogoClick"
        >
          <img
            :src="logo"
            alt="Logo"
            height="60"
            width="60"
            class="q-pa-xs"
          />
        </a>
      </q-toolbar-title>

      <q-space />

      <!-- Menu principal -->
      <q-tabs
        v-model="activeSection"
        class="gt-sm"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
        shrink
        align="center"
      >
        <q-tab
          v-for="section in sections"
          :key="section.id"
          :name="section.id"
          :label="section.label"
          no-caps
          :class="isDark ? '' : 'text-dark'"
          @click="scrollToSection(section.id)"
        />
      </q-tabs>

      <q-space />

      <!-- Tema desktop -->
      <div class="row items-center q-gutter-xs gt-sm">
        <q-btn
          flat
          round
          :icon="themeIcon"
          :aria-label="themeLabel"
          :title="themeLabel"
          :class="isDark ? '' : 'text-dark'"
          @click="toggleTheme"
        />
      </div>

      <!-- Tema mobile -->
      <q-btn
        flat
        round
        :icon="themeIcon"
        class="lt-md"
        :aria-label="themeLabel"
        :title="themeLabel"
        :class="isDark ? '' : 'text-dark'"
        @click="toggleTheme"
      />

      <!-- Botão menu mobile -->
      <q-btn
        flat
        round
        icon="mdi-menu"
        class="lt-md"
        :class="isDark ? '' : 'text-dark'"
        aria-label="Abrir menu"
        @click="isMobileMenuOpen = true"
      />
    </q-toolbar>
  </q-header>

  <!-- =====================================================
       DRAWER MOBILE
       ===================================================== -->

  <q-drawer
    v-model="isMobileMenuOpen"
    side="right"
    overlay
    bordered
    behavior="mobile"
    :dark="isDark"
    :width="280"
    :class="isDark ? 'bg-grey-9' : ''"
  >
    <!-- Cabeçalho -->
    <div
      class="row items-center justify-between q-pa-md"
      :class="
        isDark
          ? 'text-white text-bold'
          : 'text-bold'
      "
    >
      <span class="text-subtitle1 text-bold">
        Menu
      </span>

      <q-btn
        flat
        round
        icon="mdi-close"
        aria-label="Fechar menu"
        @click="isMobileMenuOpen = false"
      />
    </div>

    <q-separator :dark="isDark" />

    <!-- Links -->
    <q-list
      padding
      :class="
        isDark
          ? 'text-white text-bold'
          : 'text-dark text-bold'
      "
    >
      <q-item
        v-for="section in sections"
        :key="section.id"
        clickable
        :active="activeSection === section.id"
        active-class="text-primary"
        @click="scrollToSection(section.id)"
      >
        <q-item-section
          top
          avatar
        >
          <q-avatar rounded>
            <q-icon
              :name="section.icon"
              size="30px"
              aria-hidden="true"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{ section.label }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>