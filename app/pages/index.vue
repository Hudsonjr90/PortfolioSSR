<script setup lang="ts">
const { data: companies } = await useFetch('/api/companies')

const features = [
  {
    icon: 'i-lucide-zap',
    title: 'Rápido e simples',
    description: 'Agende em menos de 2 minutos sem complicação.',
  },
  {
    icon: 'i-lucide-bell',
    title: 'Notificações automáticas',
    description: 'Receba confirmações por email e WhatsApp.',
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Seguro e confiável',
    description: 'Seus dados protegidos. Cancele a qualquer momento.',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-24 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6">
          Agende com facilidade
        </h1>
        <p class="text-xl text-primary-100 mb-10">
          Encontre empresas, escolha seu horário e confirme seu agendamento em minutos.
        </p>
        <div class="flex gap-4 justify-center flex-wrap">
          <NuxtLink to="/register">
            <UButton size="xl" color="primary" label="Quero agendar" icon="i-lucide-calendar" />
          </NuxtLink>
          <NuxtLink to="/register-business">
            <UButton size="xl" variant="outline" label="Cadastrar minha empresa" icon="i-lucide-store" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Companies -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Empresas disponíveis
      </h2>
      <p class="text-gray-500 mb-8">
        Encontre o serviço que você precisa
      </p>

      <div v-if="companies?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <NuxtLink
          v-for="company in companies"
          :key="(company as any).id"
          :to="`/${(company as any).slug}`"
          class="block"
        >
          <UCard class="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <div class="flex flex-col items-center text-center gap-3 p-2">
              <div class="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center overflow-hidden">
                <img v-if="(company as any).logo" :src="(company as any).logo" :alt="(company as any).name" class="w-full h-full object-cover" />
                <UIcon v-else name="i-lucide-store" class="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">
                  {{ (company as any).name }}
                </h3>
                <p v-if="(company as any).description" class="text-sm text-gray-500 mt-1 line-clamp-2">
                  {{ (company as any).description }}
                </p>
                <p v-if="(company as any).address" class="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                  <UIcon name="i-lucide-map-pin" class="w-3 h-3" />
                  {{ (company as any).address }}
                </p>
              </div>
              <UButton size="sm" variant="soft" label="Ver agendamentos" class="mt-auto" />
            </div>
          </UCard>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-16 text-gray-400">
        <UIcon name="i-lucide-store" class="w-12 h-12 mx-auto mb-4" />
        <p class="text-lg">Nenhuma empresa cadastrada ainda.</p>
        <NuxtLink to="/register-business">
          <UButton class="mt-4" label="Seja o primeiro" />
        </NuxtLink>
      </div>
    </section>

    <!-- Features -->
    <section class="bg-white dark:bg-gray-900 py-16 px-4">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div v-for="feat in features" :key="feat.title" class="flex flex-col items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <UIcon :name="feat.icon" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white">
            {{ feat.title }}
          </h3>
          <p class="text-sm text-gray-500">
            {{ feat.description }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
