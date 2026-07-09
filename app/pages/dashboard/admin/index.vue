<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'role', meta: { roles: ['ADMIN'] } })

const { data: companies } = await useFetch('/api/companies')
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Todas as Empresas</h1>
      <p class="text-gray-500">Visão geral de todas as empresas cadastradas na plataforma</p>
    </div>

    <div v-if="(companies as any[])?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard v-for="company in (companies as any[])" :key="company.id">
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img v-if="company.logo" :src="company.logo" :alt="company.name" class="w-full h-full object-cover" />
            <UIcon v-else name="i-lucide-store" class="w-6 h-6 text-primary-600" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 dark:text-white truncate">{{ company.name }}</h3>
            <p class="text-sm text-gray-500">{{ company.slug }}</p>
            <div class="flex gap-2 mt-2">
              <NuxtLink :to="`/${company.slug}`" target="_blank">
                <UButton size="xs" variant="soft" icon="i-lucide-external-link" label="Ver página" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <div v-else class="text-center py-16 text-gray-400">
      <UIcon name="i-lucide-store" class="w-12 h-12 mx-auto mb-3" />
      <p>Nenhuma empresa cadastrada ainda</p>
    </div>
  </div>
</template>
