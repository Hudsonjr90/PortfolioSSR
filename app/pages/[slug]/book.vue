<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const toast = useToast()
const { data: session } = await authClient.useSession(useFetch)

const { data: company } = await useFetch<any>(`/api/companies/${route.params.slug}`)
if (!company.value) await navigateTo(`/${route.params.slug}`)

const step = ref(1)
const selectedService = ref<any>(null)
const selectedDate = ref('')
const selectedSlot = ref('')
const notes = ref('')
const loading = ref(false)

// Pre-select service from query param
if (route.query.serviceId) {
  const preSelected = company.value?.services?.find((s: any) => s.id === route.query.serviceId)
  if (preSelected) {
    selectedService.value = preSelected
    step.value = 2
  }
}

const minDate = computed(() => new Date().toISOString().split('T')[0])

const { data: slots, refresh: refreshSlots } = await useFetch('/api/appointments/available-slots', {
  query: computed(() => ({
    companyId: company.value?.id,
    serviceId: selectedService.value?.id,
    date: selectedDate.value,
  })),
  immediate: false,
})

watch(selectedDate, () => {
  selectedSlot.value = ''
  if (selectedDate.value && selectedService.value) refreshSlots()
})

async function confirm() {
  loading.value = true
  try {
    await $fetch('/api/appointments', {
      method: 'POST',
      body: {
        companyId: company.value?.id,
        serviceId: selectedService.value?.id,
        date: selectedDate.value,
        startTime: selectedSlot.value,
        notes: notes.value || undefined,
      },
    })
    step.value = 4
  }
  catch (e: any) {
    toast.add({ title: e.data?.statusMessage ?? 'Erro ao agendar', color: 'error' })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-10">
    <div class="flex items-center gap-3 mb-8">
      <NuxtLink :to="`/${route.params.slug}`">
        <UButton icon="i-lucide-arrow-left" variant="ghost" />
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Agendar horário</h1>
        <p class="text-gray-500">{{ company?.name }}</p>
      </div>
    </div>

    <!-- Steps indicator -->
    <div class="flex items-center gap-2 mb-8" v-if="step < 4">
      <div v-for="n in 3" :key="n" class="flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          :class="step >= n ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400 dark:bg-gray-700'"
        >
          {{ n }}
        </div>
        <span class="text-sm" :class="step >= n ? 'text-gray-900 dark:text-white' : 'text-gray-400'">
          {{ ['Serviço', 'Data', 'Confirmar'][n - 1] }}
        </span>
        <div v-if="n < 3" class="w-8 h-px bg-gray-200 dark:bg-gray-700 mx-1" />
      </div>
    </div>

    <!-- Step 1: Choose service -->
    <div v-if="step === 1" class="space-y-3">
      <h2 class="font-semibold text-gray-900 dark:text-white mb-4">Escolha o serviço</h2>
      <UCard
        v-for="service in company?.services"
        :key="service.id"
        class="cursor-pointer hover:shadow-md transition-shadow"
        :class="selectedService?.id === service.id ? 'ring-2 ring-primary-500' : ''"
        @click="selectedService = service; step = 2"
      >
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-gray-900 dark:text-white">{{ service.name }}</p>
            <div class="flex gap-2 mt-1">
              <UBadge variant="soft" :label="`${service.duration}min`" icon="i-lucide-clock" />
              <UBadge v-if="service.price" variant="soft" color="success" :label="`R$ ${service.price.toFixed(2)}`" />
            </div>
          </div>
          <UIcon name="i-lucide-chevron-right" class="text-gray-400" />
        </div>
      </UCard>
    </div>

    <!-- Step 2: Choose date & time -->
    <div v-else-if="step === 2">
      <div class="flex items-center gap-3 mb-6">
        <UButton icon="i-lucide-arrow-left" variant="ghost" @click="step = 1" />
        <div>
          <p class="font-semibold text-gray-900 dark:text-white">{{ selectedService?.name }}</p>
          <p class="text-sm text-gray-500">Escolha data e horário</p>
        </div>
      </div>

      <UFormField label="Data" class="mb-6">
        <UInput v-model="selectedDate" type="date" :min="minDate" class="w-full" />
      </UFormField>

      <div v-if="selectedDate">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Horários disponíveis</p>
        <div v-if="slots?.length" class="grid grid-cols-4 gap-2">
          <button
            v-for="slot in (slots as string[])"
            :key="slot"
            class="py-2 px-3 text-sm rounded-lg border font-medium transition-colors"
            :class="
              selectedSlot === slot
                ? 'bg-primary-600 text-white border-primary-600'
                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-400'
            "
            @click="selectedSlot = slot"
          >
            {{ slot }}
          </button>
        </div>
        <p v-else class="text-gray-400 text-sm">Nenhum horário disponível para esta data.</p>
      </div>

      <UButton
        class="mt-6"
        :disabled="!selectedSlot"
        label="Continuar"
        trailing-icon="i-lucide-arrow-right"
        block
        @click="step = 3"
      />
    </div>

    <!-- Step 3: Confirm -->
    <div v-else-if="step === 3">
      <div class="flex items-center gap-3 mb-6">
        <UButton icon="i-lucide-arrow-left" variant="ghost" @click="step = 2" />
        <h2 class="font-semibold text-gray-900 dark:text-white">Confirmar agendamento</h2>
      </div>

      <UCard class="mb-6">
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-500">Empresa</span>
            <span class="font-medium">{{ company?.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Serviço</span>
            <span class="font-medium">{{ selectedService?.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Data</span>
            <span class="font-medium">{{ new Date(selectedDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Horário</span>
            <span class="font-medium">{{ selectedSlot }}</span>
          </div>
          <div v-if="selectedService?.price" class="flex justify-between border-t pt-3 dark:border-gray-700">
            <span class="text-gray-500">Valor</span>
            <span class="font-bold text-green-600">R$ {{ selectedService.price.toFixed(2) }}</span>
          </div>
        </div>
      </UCard>

      <UFormField label="Observações (opcional)" class="mb-6">
        <UTextarea v-model="notes" placeholder="Alguma informação adicional..." class="w-full" />
      </UFormField>

      <UButton :loading="loading" label="Confirmar agendamento" icon="i-lucide-check" block @click="confirm" />
    </div>

    <!-- Step 4: Success -->
    <div v-else class="text-center py-10">
      <div class="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-6">
        <UIcon name="i-lucide-check-circle" class="w-10 h-10 text-green-600 dark:text-green-400" />
      </div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Agendamento confirmado!</h2>
      <p class="text-gray-500 mb-8">Você receberá uma confirmação por email.</p>
      <div class="flex gap-3 justify-center">
        <NuxtLink to="/dashboard/appointments">
          <UButton label="Ver meus agendamentos" />
        </NuxtLink>
        <NuxtLink :to="`/${route.params.slug}`">
          <UButton variant="outline" label="Voltar para a empresa" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
