<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const form = reactive({
  name: '',
  email: '',
  password: '',
  cpf: '',
  phone: '',
})
const error = ref('')
const loading = ref(false)

async function handleRegister() {
  error.value = ''
  loading.value = true
  try {
    const { error: err } = await signUp({ ...form, role: 'CLIENT' })
    if (err) {
      error.value = err.message ?? 'Erro ao criar conta'
    }
    else {
      await $fetch('/api/users/me', { method: 'PUT', body: { cpf: form.cpf || undefined, phone: form.phone || undefined } }).catch(() => {})
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
        Criar conta de cliente
      </h1>
    </template>

    <form class="space-y-4" @submit.prevent="handleRegister">
      <UFormField label="Nome completo" name="name">
        <UInput v-model="form.name" placeholder="João Silva" required class="w-full" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput v-model="form.email" type="email" placeholder="seu@email.com" required class="w-full" />
      </UFormField>

      <UFormField label="CPF" name="cpf">
        <UInput v-model="form.cpf" placeholder="000.000.000-00" class="w-full" />
      </UFormField>

      <UFormField label="Telefone / WhatsApp" name="phone">
        <UInput v-model="form.phone" placeholder="(11) 99999-9999" class="w-full" />
      </UFormField>

      <UFormField label="Senha" name="password">
        <UInput v-model="form.password" type="password" placeholder="••••••••" required minlength="8" class="w-full" />
      </UFormField>

      <UAlert v-if="error" color="error" :description="error" icon="i-lucide-alert-circle" />

      <UButton type="submit" block :loading="loading" label="Criar conta" />
    </form>

    <template #footer>
      <p class="text-sm text-center text-gray-500">
        Já tem conta?
        <NuxtLink to="/login" class="text-primary-600 font-medium hover:underline">Entrar</NuxtLink>
      </p>
    </template>
  </UCard>
</template>
