export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch)
  if (!session.value) return navigateTo('/login')

  const role = (session.value.user as { role?: string }).role ?? ''
  const requiredRoles = to.meta.roles as string[] | undefined
  if (requiredRoles && !requiredRoles.includes(role)) {
    return navigateTo('/dashboard')
  }
})
