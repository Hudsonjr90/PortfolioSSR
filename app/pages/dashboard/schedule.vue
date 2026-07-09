<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'role', meta: { roles: ['ADVERTISER', 'ADMIN'] } })

const toast = useToast()
const { data: user } = await useFetch<any>('/api/users/me')

const companies = await $fetch<any[]>('/api/companies')
const myCompany = companies.find((c) => c.ownerId === user.value?.id)
if (!myCompany) await navigateTo('/dashboard/company')

const days = [
  { label: 'Domingo', value: 0 },
  { label: 'Segunda-feira', value: 1 },
  { label: 'Terça-feira', value: 2 },
  { label: 'Quarta-feira', value: 3 },
  { label: 'Quinta-feira', value: 4 },
  { label: 'Sexta-feira', value: 5 },
  { label: 'Sábado', value: 6 },
]

const schedules = ref<any[]>(
  days.map((d) => ({
    dayOfWeek: d.value,
    startTime: '09:00',
    endTime: '18:00',
    slotDuration: 60,
    isActive: d.value >= 1 && d.value <= 5,
  })),
)

const { data: existing } = await useFetch<any[]>(`/api/schedules/${myCompany?.id}`)
if (existing.value?.length) {
  existing.value.forEach((e) => {
    const idx = schedules.value.findIndex((s) => s.dayOfWeek === e.dayOfWeek)
    if (idx !== -1) schedules.value[idx] = { ...schedules.value[idx], ...e }
  })
}

const loading = ref(false)
const slotOptions = [
  { label: '15 minutos', value: 15 },
  { label: '30 minutos', value: 30 },
  { label: '45 minutos', value: 45 },
  { label: '1 hora', value: 60 },
  { label: '1h 30min', value: 90 },
  { label: '2 horas', value: 120 },
]

async function save() {
  loading.value = true
  try {
    await $fetch('/api/schedules', {
      method: 'PUT',
      body: { companyId: myCompany?.id, schedules: schedules.value },
    })
    toast.add({ title: 'Horários salvos!', color: 'success' })
  }
  catch (e: any) {
    toast.add({ title: e.data?.statusMessage ?? 'Erro ao salvar', color: 'error' })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Horários de Funcionamento</h1>
        <p class="text-gray-500">Defina os dias e horários disponíveis para agendamento</p>
      </div>
      <UButton :loading="loading" icon="i-lucide-save" label="Salvar horários" @click="save" />
    </div>

    <div class="space-y-3">
      <UCard v-for="(schedule, i) in schedules" :key="schedule.dayOfWeek">
        <div class="flex items-center gap-4">
          <UToggle v-model="schedule.isActive" />
          <span class="w-32 font-medium text-gray-900 dark:text-white">{{ days[i].label }}</span>
          <template v-if="schedule.isActive">
            <div class="flex items-center gap-2 flex-1">
              <UFormField label="Início" class="flex-1">
                <UInput v-model="schedule.startTime" type="time" class="w-full" />
              </UFormField>
              <span class="text-gray-400 mt-5">→</span>
              <UFormField label="Fim" class="flex-1">
                <UInput v-model="schedule.endTime" type="time" class="w-full" />
              </UFormField>
              <UFormField label="Duração do slot" class="flex-1">
                <USelect
                  v-model.number="schedule.slotDuration"
                  :items="slotOptions"
                  value-key="value"
                  label-key="label"
                  class="w-full"
                />
              </UFormField>
            </div>
          </template>
          <span v-else class="text-gray-400 text-sm">Fechado</span>
        </div>
      </UCard>
    </div>
  </div>
</template>
