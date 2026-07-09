<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'role', meta: { roles: ['ADVERTISER', 'ADMIN'] } })

const toast = useToast()
const { data: user } = await useFetch<any>('/api/users/me')

const companies = await $fetch<any[]>('/api/companies')
const myCompany = companies.find((c) => c.ownerId === user.value?.id)

if (!myCompany) {
  await navigateTo('/dashboard/company')
}

const { data: services, refresh } = await useFetch('/api/services', {
  query: { companyId: myCompany?.id },
})

const showModal = ref(false)
const editingService = ref<any>(null)
const loading = ref(false)

const form = reactive({ name: '', description: '', duration: 60, price: undefined as number | undefined })

function openCreate() {
  editingService.value = null
  Object.assign(form, { name: '', description: '', duration: 60, price: undefined })
  showModal.value = true
}

function openEdit(service: any) {
  editingService.value = service
  Object.assign(form, { name: service.name, description: service.description ?? '', duration: service.duration, price: service.price })
  showModal.value = true
}

async function save() {
  loading.value = true
  try {
    if (editingService.value) {
      await $fetch(`/api/services/${editingService.value.id}`, { method: 'PUT', body: form })
      toast.add({ title: 'Serviço atualizado!', color: 'success' })
    }
    else {
      await $fetch('/api/services', { method: 'POST', body: { ...form, companyId: myCompany?.id } })
      toast.add({ title: 'Serviço criado!', color: 'success' })
    }
    showModal.value = false
    await refresh()
  }
  catch (e: any) {
    toast.add({ title: e.data?.statusMessage ?? 'Erro', color: 'error' })
  }
  finally {
    loading.value = false
  }
}

async function remove(id: string) {
  await $fetch(`/api/services/${id}`, { method: 'DELETE' })
  await refresh()
  toast.add({ title: 'Serviço removido', color: 'neutral' })
}

function formatDuration(min: number) {
  if (min < 60) return `${min}min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `${h}h ${m}min` : `${h}h`
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Serviços</h1>
        <p class="text-gray-500">Gerencie os serviços oferecidos pela sua empresa</p>
      </div>
      <UButton icon="i-lucide-plus" label="Novo serviço" @click="openCreate" />
    </div>

    <div v-if="(services as any[])?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard v-for="service in (services as any[])" :key="service.id">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900 dark:text-white">{{ service.name }}</h3>
            <p v-if="service.description" class="text-sm text-gray-500 mt-1">{{ service.description }}</p>
            <div class="flex items-center gap-3 mt-3">
              <UBadge variant="soft" :label="formatDuration(service.duration)" icon="i-lucide-clock" />
              <UBadge v-if="service.price" variant="soft" color="success" :label="`R$ ${service.price.toFixed(2)}`" />
              <UBadge v-else variant="soft" color="neutral" label="Gratuito" />
            </div>
          </div>
          <div class="flex gap-1 ml-2">
            <UButton icon="i-lucide-pencil" variant="ghost" size="sm" @click="openEdit(service)" />
            <UButton icon="i-lucide-trash-2" variant="ghost" size="sm" color="error" @click="remove(service.id)" />
          </div>
        </div>
      </UCard>
    </div>

    <div v-else class="text-center py-16 text-gray-400">
      <UIcon name="i-lucide-scissors" class="w-12 h-12 mx-auto mb-3" />
      <p class="text-lg">Nenhum serviço cadastrado</p>
      <UButton class="mt-4" label="Adicionar primeiro serviço" @click="openCreate" />
    </div>

    <UModal v-model:open="showModal" :title="editingService ? 'Editar serviço' : 'Novo serviço'">
      <template #body>
        <form class="space-y-4" @submit.prevent="save">
          <UFormField label="Nome do serviço" required>
            <UInput v-model="form.name" placeholder="Corte de cabelo" required class="w-full" />
          </UFormField>
          <UFormField label="Descrição">
            <UTextarea v-model="form.description" placeholder="Descreva o serviço..." class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Duração (minutos)" required>
              <UInput v-model.number="form.duration" type="number" min="5" step="5" required class="w-full" />
            </UFormField>
            <UFormField label="Preço (R$)">
              <UInput v-model.number="form.price" type="number" min="0" step="0.01" placeholder="0,00" class="w-full" />
            </UFormField>
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <UButton variant="ghost" label="Cancelar" @click="showModal = false" />
            <UButton type="submit" :loading="loading" :label="editingService ? 'Salvar' : 'Criar'" />
          </div>
        </form>
      </template>
    </UModal>
  </div>
</template>
