<script setup lang="ts">
import profileImage from "~/assets/images/profile/home.webp";

const { data: portfolio, pending, error } = usePortfolio();
</script>

<template>
  <section id="inicio" class="q-py-xl">
    <div class="wrapper">
      <div v-if="pending" class="row items-center justify-center q-py-xl">
        <q-spinner color="primary" size="50px" />
      </div>

      <div v-else-if="error" class="row items-center justify-center q-py-xl">
        <q-banner rounded class="bg-negative text-white">
          Não foi possível carregar os dados do portfólio.
        </q-banner>
      </div>

      <div v-else-if="portfolio" class="row items-center q-col-gutter-xl">
        <div class="col-12 col-md-7">
          <div class="q-mb-md">
            <q-chip
              v-if="portfolio.profile.location"
              color="primary"
              text-color="white"
              icon="mdi-map-marker"
            >
              {{ portfolio.profile.location }}
            </q-chip>
          </div>

          <div class="text-h2 text-weight-bold q-mb-md">
            {{ portfolio.profile.name }}
          </div>

          <div class="text-h4 text-primary text-weight-medium q-mb-lg">
            {{ portfolio.profile.headline }}
          </div>

          <div class="text-body1 text-white q-mb-xl">
            {{ portfolio.profile.shortBio }}
          </div>

          <div class="row items-center q-gutter-sm">
            <q-btn-dropdown
              outline
              color="primary"
              icon="mdi-file-document-outline"
              label="Meu currículo"
              no-caps
            >
              <q-list class="bg-secondary text-white ">
                <q-item
                  clickable
                  v-close-popup
                  tag="a"
                  href="/documents/HudsonKennedy.pdf"
                  target="_blank"
                >
                  <q-item-section avatar>
                    <q-icon name="mdi-lightbulb-on-outline" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Currículo Criativo</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  tag="a"
                  href="/documents/HudsonKennedyAts.pdf"
                  target="_blank"
                >
                  <q-item-section avatar>
                    <q-icon name="mdi-robot-outline" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Currículo ATS</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>

        <div class="col-12 col-md-5 flex flex-center">
          <q-avatar size="280px" class="shadow-10">
            <img :src="profileImage" :alt="portfolio.profile.name" />
          </q-avatar>
        </div>
      </div>
    </div>
  </section>
</template>

<!--  -->