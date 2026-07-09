<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'role', meta: { roles: ['ADMIN'] } })

const toast = useToast()
const search = ref('')
const filterRole = ref('')

const { data: users, refresh } = await useFetch('/api/admin/users', {
  query: computed(() => ({
    search: search.value || undefined,
    role: filterRole.value || undefined,
  })),
  watch: [search, filterRole],
})

const roleOptions = [
  { label: 'Todos', value: '' },
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Advertiser', value: 'ADVERTISER' },
  { label: 'Cliente', value: 'CLIENT' },
]

const roleColors: Record<string, 'error' | 'warning' | 'info'> = {
  ADMIN: 'error',
  ADVERTISER: 'warning',
  CLIENT: 'info',
}

async function changeRole(id: string, role: string) {
  try {
    await $fetch(`/api/admin/users/${id}`, { method: 'PUT', body: { role } })
    await refresh()
    toast.add({ title: 'Role atualizado', color: 'success' })
  }
  catch {
    toast.add({ title: 'Erro ao atualizar role', color: 'error' })
  }
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Gerenciar Usuários</h1>
      <p class="text-gray-500">Visualize e altere os papéis dos usuários da plataforma</p>
    </div>

    <div class="flex gap-4 mb-6 flex-wrap">
      <UInput v-model="search" placeholder="Buscar por nome ou email..." icon="i-lucide-search" class="w-64" />
      <USelect v-model="filterRole" :items="roleOptions" value-key="value" label-key="label" class="w-44" />
    </div>

    <UCard>
      <div v-if="(users as any[])?.length" class="divide-y divide-gray-100 dark:divide-gray-800">
        <div v-for="user in (users as any[])" :key="user.id" class="flex items-center gap-4 py-3">
          <UAvatar :alt="user.name" size="sm" />
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 dark:text-white">{{ user.name }}</p>
            <p class="text-sm text-gray-500">{{ user.email }}</p>
            <p v-if="user.phone" class="text-xs text-gray-400">{{ user.phone }}</p>
          </div>
          <UBadge :color="roleColors[user.role]" :label="user.role" variant="subtle" />
          <UDropdownMenu
            :items="[
              { label: 'Tornar Admin', click: () => changeRole(user.id, 'ADMIN') },
              { label: 'Tornar Advertiser', click: () => changeRole(user.id, 'ADVERTISER') },
              { label: 'Tornar Cliente', click: () => changeRole(user.id, 'CLIENT') },
            ]"
          >
            <UButton icon="i-lucide-more-vertical" variant="ghost" size="sm" />
          </UDropdownMenu>
        </div>
      </div>

      <div v-else class="text-center py-10 text-gray-400">
        <UIcon name="i-lucide-users" class="w-10 h-10 mx-auto mb-2" />
        <p>Nenhum usuário encontrado</p>
      </div>
    </UCard>
  </div>
</template>
