<script setup lang="ts">
import logo from "~/assets/images/logow.webp";

</script>

<template>
  <q-header bordered class="bg-transparent backdrop-blur">
    <q-toolbar class="wrapper q-px-md">
      <!-- Logo -->
      <q-toolbar-title class="col-auto">
        <a href="/" class="row items-center no-decoration">
          <img :src="logo" alt="HK Dev" height="42" />
        </a>
      </q-toolbar-title>

      <q-space />

      <!-- Menu principal -->
      <q-tabs
        class="gt-sm"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
        shrink
      >
        <q-route-tab name="sobre" label="Sobre" href="#sobre" no-caps />

        <q-route-tab
          name="tecnologias"
          label="Tecnologias"
          href="#tecnologias"
          no-caps
        />

        <q-route-tab
          name="experiencia"
          label="Experiências"
          href="#experiencia"
          no-caps
        />

        <q-route-tab
          name="depoimentos"
          label="Depoimentos"
          href="#depoimentos"
          no-caps
        />

        <q-route-tab name="contato" label="Contato" href="#contato" no-caps />
      </q-tabs>

      <q-space />

      <!-- Redes sociais -->
      <div class="row items-center q-gutter-xs gt-sm">
        <q-btn
          flat
          round
          icon="mdi-github"
          aria-label="GitHub"
          href="#"
          target="_blank"
        />

        <q-btn
          flat
          round
          icon="mdi-linkedin"
          aria-label="LinkedIn"
          href="#"
          target="_blank"
        />

        <q-btn flat round icon="mdi-whatsapp" aria-label="WhatsApp" href="#" />

        <q-btn
          flat
          round
          icon="mdi-email-outline"
          aria-label="Email"
          href="#"
          target="_blank"
        />

        <q-btn
          flat
          round
          :icon="$q.dark.isActive ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          :aria-label="
            $q.dark.isActive ? 'Ativar tema claro' : 'Ativar tema escuro'
          "
          @click="$q.dark.toggle()"
        />
      </div>

      <!-- Menu mobile -->
      <q-btn flat round icon="mdi-menu" class="lt-md">
        <q-menu>
          <q-list style="min-width: 200px" class="bg-transparent ">
            <q-item clickable v-close-popup tag="a" href="#sobre">
              <q-item-section>Sobre</q-item-section>
            </q-item>

            <q-item clickable v-close-popup tag="a" href="#tecnologias">
              <q-item-section>Tecnologias</q-item-section>
            </q-item>

            <q-item clickable v-close-popup tag="a" href="#experiencia">
              <q-item-section>Experiências</q-item-section>
            </q-item>

            <q-item clickable v-close-popup tag="a" href="#depoimentos">
              <q-item-section>Depoimentos</q-item-section>
            </q-item>

            <q-item clickable v-close-popup tag="a" href="#contato">
              <q-item-section>Contato</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>
