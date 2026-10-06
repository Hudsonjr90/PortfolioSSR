<template>
  <q-dialog v-model="isOpen" :aria-label="project ? `Detalhes de ${project.name}` : undefined">
    <q-card v-if="project" class="project-details-card bg-transparent backdrop-blur text-white">
      <q-img
        :src="resolveProjectAsset(project.previewGif || project.image)"
        :alt="`Prévia do projeto ${project.name || 'em breve'}`"
        class="project-details-image"
        fit="contain"
      />

      <q-card-section>
        <div v-if="project.category" class="text-caption text-grey-4">
          {{ project.category }}
        </div>
        <div class="text-h5 text-weight-bold q-mt-xs">
          {{ project.name || 'Projeto em breve' }}
        </div>
        <p v-if="project.subtitle" class="text-primary text-weight-medium q-mb-none q-mt-sm">
          {{ project.subtitle }}
        </p>
        <p v-if="project.description" class="text-body1 q-mb-none q-mt-md">
          {{ project.description }}
        </p>

        <div
          v-if="project.technologies.length"
          class="row q-gutter-sm q-mt-md"
          aria-label="Tecnologias utilizadas"
        >
          <q-badge
            v-for="technology in project.technologies"
            :key="technology"
            color="primary"
            outline
            :label="technology"
          />
        </div>
      </q-card-section>

      <q-separator color="grey-8" />

      <q-card-actions align="between" class="q-pa-md">
        <div class="row items-center q-gutter-sm">
          <q-btn
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            icon-right="mdi-arrow-top-right"
            label="Ver deploy"
          />
          <q-btn
            v-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
            flat
            color="primary"
            icon="mdi-github"
            label="GitHub"
          />
          <span v-if="!project.url && !project.github" class="text-caption text-grey-5">
            Links do projeto em breve
          </span>
        </div>
        <q-btn v-close-popup flat color="white" label="Fechar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectRecord } from '#shared/types/project'
import { resolveProjectAsset } from '~/utils/global'

const props = defineProps<{
  modelValue: boolean
  project: ProjectRecord | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})
</script>

<style scoped>
.project-details-card {
  width: min(720px, 90vw);
  max-width: 90vw;
}

.project-details-image {
  height: min(48vh, 360px);
  background: #111;
}
</style>
