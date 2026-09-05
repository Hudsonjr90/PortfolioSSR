<script setup lang="ts">
import profileImage from "~/assets/images/profile/home.webp";

const { data: portfolio, pending, error } = usePortfolio();
const { isMobile } = useMobile();


const principles = [
  {
    title: 'Arquitetura & Escalabilidade',
    description:
      'Estruturo soluções pensando em crescimento, manutenção e evolução contínua do produto.',
    icon: 'mdi-layers-outline',
  },
  {
    title: 'Performance & Qualidade',
    description:
      'Busco código eficiente, consultas otimizadas e experiências rápidas e consistentes.',
    icon: 'mdi-speedometer',
  },
  {
    title: 'Segurança & Boas Práticas',
    description:
      'Aplico princípios de segurança, organização e padrões que tornam o software mais confiável.',
    icon: 'mdi-shield-check-outline',
  },
]
</script>

<template>
  <section
    id="sobre"
    class="q-py-xl"
  >
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

          <div class="text-weight-bold q-mb-md" :class="isMobile ? 'text-h4' : 'text-h2'">
            {{ portfolio.profile.name }}
          </div>

          <div class="text-primary text-weight-medium q-mb-lg" :class="isMobile ? 'text-h5' : 'text-h4 '">
            {{ portfolio.profile.headline }}
          </div>

          <div class="text-body1 text-white q-mb-xl">
            {{ portfolio.profile.shortBio }}
          </div>

          <div class="row items-center q-gutter-sm">
            <q-btn-dropdown
              outline
              icon="mdi-file-document-outline"
              label="Meu currículo"
              no-caps
            >
              <q-list class="bg-primary text-white ">
                <q-item
                  clickable
                  v-close-popup
                  tag="a"
                  href="/documents/HudsonKennedy.pdf"
                  download="HudsonKennedy.pdf"
                >
                  <q-item-section avatar>
                    <q-icon name="mdi-lightbulb-on-outline" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Currículo Criativo</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator dark />

                <q-item
                  clickable
                  v-close-popup
                  tag="a"
                  href="/documents/HudsonKennedyAts.pdf"
                  download="HudsonKennedyAts.pdf"
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
          <q-avatar :size="isMobile ? '200px' : '280px'" class="shadow-10">
            <img :src="profileImage" :alt="portfolio.profile.name" />
          </q-avatar>
        </div>
      </div>

      <div class="row items-center q-col-gutter-xl">

        <div class="col-12 col-md-7">
          <div class="text-overline text-primary">
            Sobre mim
          </div>

          <div class="text-weight-bold q-mb-lg" :class="isMobile ? 'text-h4' : 'text-h3'">
            Experiência que gera resultado
          </div>

          <div class="text-body1">
            {{ portfolio?.profile?.about }}
          </div>
        </div>

        <div class="col-12 col-md-5">
          <div class="text-overline text-primary">
            Como eu trabalho
          </div>

          <div class="text-weight-bold q-mb-md" :class="isMobile ? 'text-h5' : 'text-h4'">
            Engenharia com propósito
          </div>

          <div class="column q-gutter-md">
            <q-card
              v-for="principle in principles"
              :key="principle.title"
              flat
              bordered
              class="bg-primary"
            >
              <q-card-section class="row items-center no-wrap q-gutter-md">

                <q-avatar
                  color="primary"
                  text-color="white"
                  size="52px"
                >
                  <q-icon
                    :name="principle.icon"
                    size="28px"
                  />
                </q-avatar>

                <div class="col">
                  <div class="text-subtitle1 text-weight-bold">
                    {{ principle.title }}
                  </div>

                  <div class="text-body2 q-mt-xs">
                    {{ principle.description }}
                  </div>
                </div>

              </q-card-section>
            </q-card>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>