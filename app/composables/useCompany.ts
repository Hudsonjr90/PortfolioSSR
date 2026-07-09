export function useCompany() {
  const company = useState<null | Record<string, unknown>>('company', () => null)

  async function fetchMyCompany() {
    try {
      const data = await $fetch('/api/companies/me')
      company.value = data as Record<string, unknown>
    }
    catch {
      company.value = null
    }
  }

  return { company, fetchMyCompany }
}
