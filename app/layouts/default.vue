<script setup lang="ts">
const { data: session } = await authClient.useSession(useFetch)
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold text-primary-600 dark:text-primary-400">
          AgendAI
        </NuxtLink>
        <nav class="flex items-center gap-4">
          <template v-if="session">
            <NuxtLink to="/dashboard">
              <UButton variant="ghost" icon="i-lucide-layout-dashboard" label="Dashboard" />
            </NuxtLink>
            <UButton variant="outline" icon="i-lucide-log-out" label="Sair" @click="signOut()" />
          </template>
          <template v-else>
            <NuxtLink to="/login">
              <UButton variant="ghost" label="Entrar" />
            </NuxtLink>
            <NuxtLink to="/register">
              <UButton color="primary" label="Cadastrar" />
            </NuxtLink>
          </template>
        </nav>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
