<script setup lang="ts">
import logo from '~/assets/images/logow.webp'

const menuItems = [
  { label: 'Sobre', target: '#sobre' },
  { label: 'Experiência', target: '#experiencia' },
  { label: 'Tecnologias', target: '#tecnologias' },
  { label: 'Formação', target: '#formacao' },
  { label: 'Contato', target: '#contato' },
]

function scrollToSection(target: string) {
  document.querySelector(target)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <q-header
    class="bg-dark text-white"
    elevated
  >
    <q-toolbar class="q-px-lg wrapper">
      <q-toolbar-title>
        <q-img
          :src="logo"
          alt="HK Dev"
          fit="contain"
          style="width: 100px; height: 50px"
        />
      </q-toolbar-title>

      <div class="row items-center q-gutter-sm">
        <q-btn
          v-for="item in menuItems"
          :key="item.target"
          flat
          no-caps
          :label="item.label"
          @click="scrollToSection(item.target)"
        />
        
      </div>
    </q-toolbar>
  </q-header>
</template>