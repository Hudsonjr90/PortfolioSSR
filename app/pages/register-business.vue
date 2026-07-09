<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const form = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
})
const error = ref('')
const loading = ref(false)

async function handleRegister() {
  error.value = ''
  loading.value = true
  try {
    const { error: err } = await signUp({ ...form, role: 'ADVERTISER' })
    if (err) {
      error.value = err.message ?? 'Erro ao criar conta'
    }
    else {
      await $fetch('/api/users/me', { method: 'PUT', body: { phone: form.phone || undefined } }).catch(() => {})
      await navigateTo('/dashboard/company')
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
      <div class="text-center">
        <h1 class="text-xl font-bold">
          Cadastrar minha empresa
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          Crie sua conta para gerenciar agendamentos
        </p>
      </div>
    </template>

    <form class="space-y-4" @submit.prevent="handleRegister">
      <UFormField label="Seu nome" name="name">
        <UInput v-model="form.name" placeholder="João Silva" required class="w-full" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput v-model="form.email" type="email" placeholder="contato@minhaempresa.com" required class="w-full" />
      </UFormField>

      <UFormField label="Telefone" name="phone">
        <UInput v-model="form.phone" placeholder="(11) 99999-9999" class="w-full" />
      </UFormField>

      <UFormField label="Senha" name="password">
        <UInput v-model="form.password" type="password" placeholder="••••••••" required minlength="8" class="w-full" />
      </UFormField>

      <UAlert v-if="error" color="error" :description="error" icon="i-lucide-alert-circle" />

      <UButton type="submit" block :loading="loading" label="Criar conta de empresa" />
    </form>

    <template #footer>
      <p class="text-sm text-center text-gray-500">
        Já tem conta?
        <NuxtLink to="/login" class="text-primary-600 font-medium hover:underline">Entrar</NuxtLink>
        · Quer agendar?
        <NuxtLink to="/register" class="text-primary-600 font-medium hover:underline">Criar conta de cliente</NuxtLink>
      </p>
    </template>
  </UCard>
</template>
