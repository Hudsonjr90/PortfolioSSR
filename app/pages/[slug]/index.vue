<script setup lang="ts">
const route = useRoute()
const { data: company, error } = await useFetch(`/api/companies/${route.params.slug}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Empresa não encontrada' })
}

const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

useSeoMeta({
  title: () => (company.value as any)?.name ?? 'Empresa',
  description: () => (company.value as any)?.description ?? '',
})
</script>

<template>
  <div v-if="company" class="max-w-4xl mx-auto px-4 py-10">
    <!-- Header da empresa -->
    <div class="flex items-start gap-6 mb-10">
      <div class="w-24 h-24 rounded-2xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center overflow-hidden flex-shrink-0 shadow">
        <img v-if="(company as any).logo" :src="(company as any).logo" :alt="(company as any).name" class="w-full h-full object-cover" />
        <UIcon v-else name="i-lucide-store" class="w-12 h-12 text-primary-600" />
      </div>
      <div class="flex-1">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ (company as any).name }}</h1>
        <p v-if="(company as any).description" class="text-gray-500 mt-2">{{ (company as any).description }}</p>
        <div class="flex flex-wrap gap-3 mt-3">
          <a v-if="(company as any).phone" :href="`tel:${(company as any).phone}`" class="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600">
            <UIcon name="i-lucide-phone" class="w-4 h-4" />{{ (company as any).phone }}
          </a>
          <a v-if="(company as any).whatsapp" :href="`https://wa.me/${(company as any).whatsapp.replace(/\D/g,'')}`" target="_blank" class="flex items-center gap-1 text-sm text-green-600 hover:text-green-700">
            <UIcon name="i-lucide-message-circle" class="w-4 h-4" />WhatsApp
          </a>
          <a v-if="(company as any).instagram" :href="`https://instagram.com/${(company as any).instagram.replace('@','')}`" target="_blank" class="flex items-center gap-1 text-sm text-pink-600 hover:text-pink-700">
            <UIcon name="i-lucide-instagram" class="w-4 h-4" />{{ (company as any).instagram }}
          </a>
          <span v-if="(company as any).address" class="flex items-center gap-1 text-sm text-gray-400">
            <UIcon name="i-lucide-map-pin" class="w-4 h-4" />{{ (company as any).address }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Services -->
      <div class="md:col-span-2">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Serviços</h2>
        <div v-if="(company as any).services?.length" class="space-y-3">
          <UCard
            v-for="service in (company as any).services"
            :key="service.id"
            class="hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ service.name }}</h3>
                <p v-if="service.description" class="text-sm text-gray-500">{{ service.description }}</p>
                <div class="flex gap-2 mt-2">
                  <UBadge variant="soft" :label="`${service.duration}min`" icon="i-lucide-clock" />
                  <UBadge v-if="service.price" variant="soft" color="success" :label="`R$ ${service.price.toFixed(2)}`" />
                </div>
              </div>
              <NuxtLink :to="`/${(company as any).slug}/book?serviceId=${service.id}`">
                <UButton label="Agendar" icon="i-lucide-calendar-plus" />
              </NuxtLink>
            </div>
          </UCard>
        </div>
        <p v-else class="text-gray-400">Nenhum serviço disponível no momento.</p>
      </div>

      <!-- Schedule info -->
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Funcionamento</h2>
        <UCard>
          <div class="space-y-2">
            <div
              v-for="day in (company as any).schedules"
              :key="day.dayOfWeek"
              class="flex justify-between text-sm"
            >
              <span class="font-medium text-gray-700 dark:text-gray-300">{{ dayNames[day.dayOfWeek] }}</span>
              <span class="text-gray-500">{{ day.startTime }} — {{ day.endTime }}</span>
            </div>
            <p v-if="!(company as any).schedules?.length" class="text-gray-400 text-sm">Horários não configurados</p>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
