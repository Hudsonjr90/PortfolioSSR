import { computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const THEME_STORAGE_KEY = 'portfolio-theme'

type Theme = 'dark' | 'light'

export const useTheme = () => {
  const $q = useQuasar()
  const isReady = useState('theme-ready', () => false)

  const isDark = computed(() => $q.dark.isActive)

  function setTheme(theme: Theme) {
    $q.dark.set(theme === 'dark')

    if (import.meta.client) {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    }
  }

  function toggleTheme() {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)

    if (savedTheme === 'dark' || savedTheme === 'light') {
      $q.dark.set(savedTheme === 'dark')
    }

    isReady.value = true
  })

  return {
    isDark,
    isReady,
    setTheme,
    toggleTheme,
  }
}
