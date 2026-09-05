<template>
  <q-layout view="hHh lpR fFf">
    <AppNavbar />

    <q-page-container class="q-mb-md">
      <q-page>
        <main>
          <HeroSection />
          <AboutSection />

          <div class="wrapper q-my-xl">
            <q-separator color="grey-8" class="q-mb-xl q-mt-xl" />
          </div>

          <EducationSection />
           <div class="wrapper q-my-xl">
            <q-separator color="grey-8" class="q-mb-xl q-mt-xl" />
          </div>

          <ExperienceSection />

          <div class="wrapper q-my-xl">
            <q-separator color="grey-8" class="q-mb-xl q-mt-xl" />
          </div>

          <!-- <TestimonialsSection />

           <div class="wrapper q-my-xl">
            <q-separator color="grey-8" class="q-mb-xl q-mt-xl" />
          </div> -->

          <TechnologySection />

          <div class="wrapper q-my-xl">
            <q-separator color="grey-8" class="q-mb-xl q-mt-xl" />
          </div>

          <ContactSection />

        </main>
      </q-page>
    </q-page-container>

    <AppFooter />
    <ScrollToTop />
  </q-layout>
</template>