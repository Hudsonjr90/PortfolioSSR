<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })

const { data: session } = await authClient.useSession(useFetch)
const userRole = computed(() => (session.value?.user as { role?: string } | null)?.role ?? '')

const today = new Date().toISOString().split('T')[0]
const { data: appointments, refresh } = await useFetch('/api/appointments', {
  query: { date: today },
})

const statusColors: Record<string, 'success' | 'warning' | 'error' | 'neutral'> = {
  CONFIRMED: 'success',
  PENDING: 'warning',
  CANCELLED: 'error',
  COMPLETED: 'neutral',
}

const statusLabels: Record<string, string> = {
  CONFIRMED: 'Confirmado',
  PENDING: 'Pendente',
  CANCELLED: 'Cancelado',
  COMPLETED: 'Concluído',
}

const stats = computed(() => {
  const all = appointments.value ?? []
  return {
    total: all.length,
    confirmed: all.filter((a: any) => a.status === 'CONFIRMED').length,
    pending: all.filter((a: any) => a.status === 'PENDING').length,
    cancelled: all.filter((a: any) => a.status === 'CANCELLED').length,
  }
})
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Bom dia, {{ session?.user?.name?.split(' ')[0] }} 👋
      </h1>
      <p class="text-gray-500">
        Agendamentos de hoje — {{ new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }) }}
      </p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <UCard>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <UIcon name="i-lucide-calendar" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
            <p class="text-xs text-gray-500">Total hoje</p>
          </div>
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.confirmed }}</p>
            <p class="text-xs text-gray-500">Confirmados</p>
          </div>
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
            <UIcon name="i-lucide-clock" class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.pending }}</p>
            <p class="text-xs text-gray-500">Pendentes</p>
          </div>
        </div>
      </UCard>
      <UCard>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <UIcon name="i-lucide-x-circle" class="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.cancelled }}</p>
            <p class="text-xs text-gray-500">Cancelados</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Appointments list -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-semibold text-gray-900 dark:text-white">Agenda de hoje</h2>
          <NuxtLink to="/dashboard/appointments">
            <UButton variant="ghost" size="sm" label="Ver todos" trailing-icon="i-lucide-arrow-right" />
          </NuxtLink>
        </div>
      </template>

      <div v-if="appointments?.length" class="divide-y divide-gray-100 dark:divide-gray-800">
        <div
          v-for="apt in appointments"
          :key="(apt as any).id"
          class="flex items-center gap-4 py-3"
        >
          <div class="text-center min-w-[60px]">
            <p class="text-lg font-bold text-gray-900 dark:text-white">{{ (apt as any).startTime }}</p>
            <p class="text-xs text-gray-400">{{ (apt as any).endTime }}</p>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 dark:text-white truncate">
              {{ userRole === 'CLIENT' ? (apt as any).company?.name : (apt as any).client?.name }}
            </p>
            <p class="text-sm text-gray-500 truncate">{{ (apt as any).service?.name }}</p>
          </div>
          <UBadge :color="statusColors[(apt as any).status]" :label="statusLabels[(apt as any).status]" variant="subtle" />
        </div>
      </div>

      <div v-else class="text-center py-10 text-gray-400">
        <UIcon name="i-lucide-calendar-x" class="w-10 h-10 mx-auto mb-2" />
        <p>Nenhum agendamento para hoje</p>
      </div>
    </UCard>
  </div>
</template>
