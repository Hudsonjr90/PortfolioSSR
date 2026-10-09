<template>
  <q-card flat bordered class="admin-panel">
    <q-card-section class="row items-start no-wrap q-gutter-md">
      <q-icon :name="icon" size="32px" color="primary" aria-hidden="true" />
      <div>
        <div class="text-h6">{{ title }}</div>
        <p class="text-body2 q-mb-sm q-mt-sm">{{ description }}</p>
        <q-banner dense rounded class="bg-grey-9 text-grey-4">
          Esta seção já está separada no painel. O formulário e a integração de gravação serão
          adicionados quando os endpoints administrativos desta área forem implementados.
        </q-banner>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: string
}>()
</script>

<style scoped>
.admin-panel {
  background: rgba(20, 20, 20, 0.72);
  backdrop-filter: blur(12px);
}
</style>
