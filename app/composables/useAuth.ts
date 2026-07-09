import { createAuthClient } from 'better-auth/vue'

export const authClient = createAuthClient({
  baseURL: useRuntimeConfig().public.appUrl,
})

export const useAuthUser = () => useState<ReturnType<typeof authClient.useSession>['data']['value'] | null>('auth-user', () => null)

export async function signIn(email: string, password: string) {
  return authClient.signIn.email({ email, password })
}

export async function signUp(data: {
  name: string
  email: string
  password: string
  cpf?: string
  phone?: string
  role?: string
}) {
  return authClient.signUp.email({
    name: data.name,
    email: data.email,
    password: data.password,
    callbackURL: '/dashboard',
  })
}

export async function signOut() {
  await authClient.signOut()
  await navigateTo('/login')
}
