<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })

const toast = useToast()
const { data: session } = await authClient.useSession(useFetch)
const userRole = computed(() => (session.value?.user as { role?: string } | null)?.role ?? '')

const filterDate = ref(new Date().toISOString().split('T')[0])
const filterStatus = ref('')

const { data: appointments, refresh } = await useFetch('/api/appointments', {
  query: computed(() => ({
    date: filterDate.value || undefined,
    status: filterStatus.value || undefined,
  })),
  watch: [filterDate, filterStatus],
})

const statusOptions = [
  { label: 'Todos', value: '' },
  { label: 'Confirmados', value: 'CONFIRMED' },
  { label: 'Pendentes', value: 'PENDING' },
  { label: 'Cancelados', value: 'CANCELLED' },
  { label: 'Concluídos', value: 'COMPLETED' },
]

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

async function updateStatus(id: string, status: string) {
  try {
    await $fetch(`/api/appointments/${id}`, { method: 'PUT', body: { status } })
    await refresh()
    toast.add({ title: 'Status atualizado', color: 'success' })
  }
  catch (e: any) {
    toast.add({ title: e.data?.statusMessage ?? 'Erro', color: 'error' })
  }
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Agendamentos</h1>
      <p class="text-gray-500">Visualize e gerencie todos os seus agendamentos</p>
    </div>

    <!-- Filters -->
    <div class="flex gap-4 mb-6 flex-wrap">
      <UFormField label="Data">
        <UInput v-model="filterDate" type="date" class="w-44" />
      </UFormField>
      <UFormField label="Status">
        <USelect v-model="filterStatus" :items="statusOptions" value-key="value" label-key="label" class="w-44" />
      </UFormField>
      <div class="flex items-end">
        <UButton variant="ghost" icon="i-lucide-x" label="Limpar" @click="filterDate = ''; filterStatus = ''" />
      </div>
    </div>

    <UCard>
      <div v-if="(appointments as any[])?.length" class="divide-y divide-gray-100 dark:divide-gray-800">
        <div v-for="apt in (appointments as any[])" :key="apt.id" class="py-4 flex items-center gap-4">
          <div class="min-w-[100px]">
            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ new Date(apt.date).toLocaleDateString('pt-BR') }}</p>
            <p class="text-lg font-bold text-primary-600">{{ apt.startTime }}</p>
            <p class="text-xs text-gray-400">até {{ apt.endTime }}</p>
          </div>

          <div class="flex-1 min-w-0">
            <p class="font-semibold text-gray-900 dark:text-white">
              {{ userRole === 'CLIENT' ? apt.company?.name : apt.client?.name }}
            </p>
            <p class="text-sm text-gray-500">{{ apt.service?.name }}</p>
            <div v-if="userRole !== 'CLIENT'" class="text-xs text-gray-400 mt-1 flex gap-3">
              <span v-if="apt.client?.email">{{ apt.client.email }}</span>
              <span v-if="apt.client?.phone">{{ apt.client.phone }}</span>
            </div>
            <p v-if="apt.notes" class="text-sm text-gray-400 mt-1 italic">{{ apt.notes }}</p>
          </div>

          <div class="flex items-center gap-2">
            <UBadge :color="statusColors[apt.status]" :label="statusLabels[apt.status]" variant="subtle" />

            <UDropdownMenu
              v-if="userRole !== 'CLIENT' || apt.status !== 'CANCELLED'"
              :items="[
                ...(userRole !== 'CLIENT' ? [
                  { label: 'Confirmar', icon: 'i-lucide-check', click: () => updateStatus(apt.id, 'CONFIRMED') },
                  { label: 'Concluir', icon: 'i-lucide-check-check', click: () => updateStatus(apt.id, 'COMPLETED') },
                ] : []),
                { label: 'Cancelar', icon: 'i-lucide-x', click: () => updateStatus(apt.id, 'CANCELLED') },
              ]"
            >
              <UButton icon="i-lucide-more-vertical" variant="ghost" size="sm" />
            </UDropdownMenu>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-400">
        <UIcon name="i-lucide-calendar-x" class="w-12 h-12 mx-auto mb-3" />
        <p>Nenhum agendamento encontrado</p>
      </div>
    </UCard>
  </div>
</template>
