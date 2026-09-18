<template>
  <q-layout view="hHh lpR fFf">
    <AppNavbar />

    <q-page-container
      class="q-mb-md container-style"
      :class="{
        'container-style--dark': isDark,
      }"
      style="padding-top: 30px"
    >
      <q-page style="min-height: calc(100vh - 30px)">
        <main>
          <CursorEffect />

          <AboutSection />

          <div class="wrapper q-my-xl">
            <q-separator color="grey-8" />
          </div>

          <EducationSection />

          <div class="wrapper q-my-xl">
            <q-separator color="grey-8" />
          </div>

          <ExperienceSection />

          <div class="wrapper q-my-xl">
            <q-separator color="grey-8" />
          </div>

          <TestimonialSection />

          <div class="wrapper q-my-xl">
            <q-separator color="grey-8" />
          </div>

          <TechnologySection />

          <div class="wrapper q-my-xl">
            <q-separator color="grey-8" />
          </div>

          <ContactSection class="contact-separation" />
        </main>
      </q-page>
    </q-page-container>

    <AppFooter />

    <ScrollToTop />
  </q-layout>
</template>

<script setup lang="ts">
import { useSeo } from '~/composables/useSeo'

const isDark = useTheme().isDark

useSeo({
  title: 'Hudson Kennedy | Desenvolvedor Full Stack',
  description: 'Desenvolvedor Full Stack com foco em arquitetura de software, engenharia de software, banco de dados e aplicações web com IA.',
})
</script>

<style scoped>
.container-style {
  position: relative;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.18) 1.3px, transparent 1.3px);
  background-size: 42px 42px;
}

.container-style--dark {
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.18) 1.3px, transparent 1.3px);
}
</style>