<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'role', meta: { roles: ['ADVERTISER', 'ADMIN'] } })

const toast = useToast()

const { data: user } = await useFetch('/api/users/me')
const company = ref<any>(null)
const loading = ref(false)
const creating = ref(false)

const createForm = reactive({ name: '', slug: '', description: '', phone: '', whatsapp: '', instagram: '', facebook: '', address: '' })
const editForm = reactive<Record<string, any>>({})

async function loadCompany() {
  try {
    const data = await $fetch<any[]>('/api/companies')
    const mine = data.find((c: any) => c.ownerId === (user.value as any)?.id)
    if (mine) {
      company.value = mine
      Object.assign(editForm, mine)
    }
  }
  catch {}
}

await loadCompany()

async function createCompany() {
  creating.value = true
  try {
    company.value = await $fetch('/api/companies', { method: 'POST', body: createForm })
    Object.assign(editForm, company.value)
    toast.add({ title: 'Empresa criada!', color: 'success' })
  }
  catch (e: any) {
    toast.add({ title: e.data?.statusMessage ?? 'Erro ao criar empresa', color: 'error' })
  }
  finally {
    creating.value = false
  }
}

async function saveCompany() {
  loading.value = true
  try {
    company.value = await $fetch(`/api/companies/${company.value.id}`, { method: 'PUT', body: editForm })
    toast.add({ title: 'Empresa atualizada!', color: 'success' })
  }
  catch (e: any) {
    toast.add({ title: e.data?.statusMessage ?? 'Erro ao salvar', color: 'error' })
  }
  finally {
    loading.value = false
  }
}

function generateSlug() {
  createForm.slug = createForm.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Minha Empresa</h1>
      <p class="text-gray-500">Configure o perfil público da sua empresa</p>
    </div>

    <!-- Create company -->
    <UCard v-if="!company" class="max-w-xl">
      <template #header>
        <h2 class="font-semibold">Configure sua empresa</h2>
        <p class="text-sm text-gray-500">Preencha os dados básicos para começar</p>
      </template>
      <form class="space-y-4" @submit.prevent="createCompany">
        <UFormField label="Nome da empresa" name="name" required>
          <UInput v-model="createForm.name" placeholder="Barbearia do Zé" required class="w-full" @input="generateSlug" />
        </UFormField>
        <UFormField label="Slug (URL)" name="slug" :hint="`agendai.app/${createForm.slug || 'seu-slug'}`">
          <UInput v-model="createForm.slug" placeholder="barbearia-do-ze" pattern="[a-z0-9-]+" required class="w-full" />
        </UFormField>
        <UFormField label="Descrição">
          <UTextarea v-model="createForm.description" placeholder="Descreva sua empresa..." class="w-full" />
        </UFormField>
        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Telefone">
            <UInput v-model="createForm.phone" placeholder="(11) 3333-3333" class="w-full" />
          </UFormField>
          <UFormField label="WhatsApp">
            <UInput v-model="createForm.whatsapp" placeholder="(11) 99999-9999" class="w-full" />
          </UFormField>
        </div>
        <UButton type="submit" :loading="creating" label="Criar empresa" block />
      </form>
    </UCard>

    <!-- Edit company -->
    <div v-else class="space-y-6 max-w-2xl">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="font-semibold">Informações da empresa</h2>
            <UBadge :label="`/${company.slug}`" variant="soft" />
          </div>
        </template>
        <form class="space-y-4" @submit.prevent="saveCompany">
          <UFormField label="Nome da empresa">
            <UInput v-model="editForm.name" required class="w-full" />
          </UFormField>
          <UFormField label="Descrição">
            <UTextarea v-model="editForm.description" class="w-full" />
          </UFormField>
          <UFormField label="Endereço">
            <UInput v-model="editForm.address" placeholder="Rua das Flores, 123 — São Paulo" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Telefone">
              <UInput v-model="editForm.phone" class="w-full" />
            </UFormField>
            <UFormField label="WhatsApp">
              <UInput v-model="editForm.whatsapp" class="w-full" />
            </UFormField>
            <UFormField label="Instagram">
              <UInput v-model="editForm.instagram" placeholder="@suaempresa" class="w-full" />
            </UFormField>
            <UFormField label="Facebook">
              <UInput v-model="editForm.facebook" placeholder="facebook.com/suaempresa" class="w-full" />
            </UFormField>
          </div>
          <UButton type="submit" :loading="loading" label="Salvar alterações" />
        </form>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="font-semibold">Notificações WhatsApp</h2>
          <p class="text-sm text-gray-500">Configure a Evolution API para enviar mensagens automáticas</p>
        </template>
        <form class="space-y-4" @submit.prevent="saveCompany">
          <UFormField label="URL da Evolution API">
            <UInput v-model="editForm.evolutionApiUrl" placeholder="https://sua-evolution-api.com" class="w-full" />
          </UFormField>
          <UFormField label="Token da API">
            <UInput v-model="editForm.evolutionApiToken" type="password" placeholder="seu-token-secreto" class="w-full" />
          </UFormField>
          <UFormField label="Nome da instância">
            <UInput v-model="editForm.evolutionApiInstance" placeholder="minha-instancia" class="w-full" />
          </UFormField>
          <UButton type="submit" :loading="loading" label="Salvar configuração WhatsApp" />
        </form>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="font-semibold">Link público</h2>
        </template>
        <div class="flex items-center gap-3">
          <UInput :model-value="`${$config.public.appUrl}/${company.slug}`" readonly class="flex-1" />
          <UButton
            icon="i-lucide-copy"
            variant="outline"
            @click="navigator.clipboard.writeText(`${$config.public.appUrl}/${company.slug}`)"
          />
          <NuxtLink :to="`/${company.slug}`" target="_blank">
            <UButton icon="i-lucide-external-link" variant="outline" />
          </NuxtLink>
        </div>
      </UCard>
    </div>
  </div>
</template>
