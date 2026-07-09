<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    const { error: err } = await signIn(email.value, password.value)
    if (err) {
      error.value = 'Email ou senha inválidos'
    }
    else {
      await navigateTo('/dashboard')
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard class="w-full max-w-sm">
    <template #header>
      <h1 class="text-xl font-bold text-center">
        Entrar na sua conta
      </h1>
    </template>

    <form class="space-y-4" @submit.prevent="handleLogin">
      <UFormField label="Email" name="email">
        <UInput
          v-model="email"
          type="email"
          placeholder="seu@email.com"
          autocomplete="email"
          required
          class="w-full"
        />
      </UFormField>

      <UFormField label="Senha" name="password">
        <UInput
          v-model="password"
          type="password"
          placeholder="••••••••"
          autocomplete="current-password"
          required
          class="w-full"
        />
      </UFormField>

      <UAlert v-if="error" color="error" :description="error" icon="i-lucide-alert-circle" />

      <UButton type="submit" block :loading="loading" label="Entrar" />
    </form>

    <template #footer>
      <p class="text-sm text-center text-gray-500">
        Não tem conta?
        <NuxtLink to="/register" class="text-primary-600 font-medium hover:underline">Cadastre-se</NuxtLink>
        ou
        <NuxtLink to="/register-business" class="text-primary-600 font-medium hover:underline">Cadastre sua empresa</NuxtLink>
      </p>
    </template>
  </UCard>
</template>
