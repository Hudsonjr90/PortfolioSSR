<script setup lang="ts">
const { data: session } = await authClient.useSession(useFetch)
const route = useRoute()

const userRole = computed(() => (session.value?.user as { role?: string } | null)?.role ?? '')

const navLinks = computed(() => {
  const base = [
    { label: 'Visão Geral', to: '/dashboard', icon: 'i-lucide-layout-dashboard', exact: true },
    { label: 'Agendamentos', to: '/dashboard/appointments', icon: 'i-lucide-calendar' },
  ]
  if (userRole.value === 'ADVERTISER' || userRole.value === 'ADMIN') {
    base.push(
      { label: 'Minha Empresa', to: '/dashboard/company', icon: 'i-lucide-building-2' },
      { label: 'Serviços', to: '/dashboard/services', icon: 'i-lucide-scissors' },
      { label: 'Horários', to: '/dashboard/schedule', icon: 'i-lucide-clock' },
    )
  }
  if (userRole.value === 'ADMIN') {
    base.push(
      { label: 'Usuários', to: '/dashboard/admin/users', icon: 'i-lucide-users' },
      { label: 'Empresas', to: '/dashboard/admin', icon: 'i-lucide-store' },
    )
  }
  return base
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div class="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
        <NuxtLink to="/" class="text-xl font-bold text-primary-600 dark:text-primary-400">
          AgendAI
        </NuxtLink>
      </div>
      <nav class="flex-1 p-4 space-y-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="
            (link.exact ? route.path === link.to : route.path.startsWith(link.to))
              ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          "
        >
          <UIcon :name="link.icon" class="w-5 h-5" />
          {{ link.label }}
        </NuxtLink>
      </nav>
      <div class="p-4 border-t border-gray-200 dark:border-gray-800">
        <div class="flex items-center gap-3 mb-3">
          <UAvatar :alt="session?.user?.name ?? ''" size="sm" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
              {{ session?.user?.name }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
              {{ session?.user?.email }}
            </p>
          </div>
        </div>
        <UButton
          variant="outline"
          icon="i-lucide-log-out"
          label="Sair"
          block
          size="sm"
          @click="signOut()"
        />
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-w-0">
      <main class="flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
