<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";

import logo from "~/assets/images/logow.webp";

const { data: portfolio } = usePortfolio();

const activeSection = ref<string | null>(null);

const sections = [
  {
    id: "sobre",
    label: "Sobre",
    icon: "mdi-information-outline",
  },
  {
    id: "formacoes",
    label: "Formações",
    icon: "mdi-folder-outline",
  },
  {
    id: "experiencia",
    label: "Experiências",
    icon: "mdi-briefcase-outline",
  },
  {
    id: "tecnologias",
    label: "Tecnologias",
    icon: "mdi-laptop",
  },
  {
    id: "depoimentos",
    label: "Depoimentos",
    icon: "mdi-comment-outline",
  },
  {
    id: "contato",
    label: "Contato",
    icon: "mdi-phone-outline",
  },
];

const socialLinks = computed(() => {
  return [...(portfolio.value?.socialLinks ?? [])].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  );
});

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function findSocialUrl(platform: string) {
  const normalizedPlatform = normalize(platform);

  const social = socialLinks.value.find(
    (item) => normalize(item.platform) === normalizedPlatform,
  );

  return social?.url ?? "";
}

const githubUrl = computed(() => {
  return findSocialUrl("github");
});

const linkedinUrl = computed(() => {
  return findSocialUrl("linkedin");
});

const whatsappUrl = computed(() => {
  return findSocialUrl("whatsapp");
});

function getSectionElement(id: string) {
  return document.getElementById(id);
}

function updateActiveSection() {
  const header = document.querySelector(".q-header") as HTMLElement | null;

  const headerHeight = header?.offsetHeight ?? 72;

  const scrollPosition = window.scrollY + headerHeight + 120;

  let currentSection: string | null = null;

  for (const section of sections) {
    const element = getSectionElement(section.id);

    if (!element) {
      continue;
    }

    const sectionTop = element.getBoundingClientRect().top + window.scrollY;

    if (sectionTop <= scrollPosition) {
      currentSection = section.id;
    }
  }

  activeSection.value = currentSection;
}

let ticking = false;

function handleScroll() {
  if (ticking) {
    return;
  }

  ticking = true;

  window.requestAnimationFrame(() => {
    updateActiveSection();
    ticking = false;
  });
}

function scrollToSection(id: string) {
  const element = getSectionElement(id);

  if (!element) {
    return;
  }

  activeSection.value = id;

  const header = document.querySelector(".q-header") as HTMLElement | null;

  const headerHeight = header?.offsetHeight ?? 72;

  const targetPosition =
    element.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

  window.scrollTo({
    top: Math.max(targetPosition, 0),
    behavior: "smooth",
  });

  window.history.replaceState(null, "", `#${id}`);
}

function handleLogoClick() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  activeSection.value = null;

  window.history.replaceState(null, "", window.location.pathname);
}

onMounted(async () => {
  await nextTick();

  window.addEventListener("scroll", handleScroll, { passive: true });

  updateActiveSection();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
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
          <img :src="logo" alt="HK Dev" height="42" />
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
          @click="scrollToSection(section.id)"
        />
      </q-tabs>

      <q-space />

      <!-- Redes sociais -->
      <div class="row items-center q-gutter-xs gt-sm">
        <q-btn
          v-if="githubUrl"
          flat
          round
          icon="mdi-github"
          aria-label="GitHub"
          :href="githubUrl"
          target="_blank"
          rel="noopener noreferrer"
        />

        <q-btn
          v-if="linkedinUrl"
          flat
          round
          icon="mdi-linkedin"
          aria-label="LinkedIn"
          :href="linkedinUrl"
          target="_blank"
          rel="noopener noreferrer"
        />

        <q-btn
          v-if="whatsappUrl"
          flat
          round
          icon="mdi-whatsapp"
          aria-label="WhatsApp"
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>

      <!-- Menu mobile -->
      <q-btn flat round icon="mdi-menu" class="lt-md" aria-label="Abrir menu">
        <q-menu>
          <!-- Redes sociais -->
          <div class="row justify-center q-gutter-sm q-pb-sm q-mt-sm">
            <q-btn
              v-if="githubUrl"
              flat
              round
              icon="mdi-github"
              aria-label="GitHub"
              :href="githubUrl"
              target="_blank"
              rel="noopener noreferrer"
            />

            <q-btn
              v-if="linkedinUrl"
              flat
              round
              icon="mdi-linkedin"
              aria-label="LinkedIn"
              :href="linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
            />

            <q-btn
              v-if="whatsappUrl"
              flat
              round
              icon="mdi-whatsapp"
              aria-label="WhatsApp"
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>

          <!-- Navegação -->
          <q-list style="min-width: 200px" class="bg-transparent">
            <q-item
              v-for="section in sections"
              :key="section.id"
              clickable
              v-close-popup
              :active="activeSection === section.id"
              active-class="text-primary"
              @click="scrollToSection(section.id)"
            >
              <q-item-section avatar>
                <q-icon :name="section.icon" size="18px" class="q-ml-sm" />
              </q-item-section>

              <q-item-section>
                {{ section.label }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>
