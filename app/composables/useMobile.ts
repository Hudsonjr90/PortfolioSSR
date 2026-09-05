import { computed } from 'vue'
import { useQuasar } from 'quasar'

export const useMobile = () => {
  const $q = useQuasar()

  const isMobile = computed(() => $q.screen.lt.sm)
  const isTablet = computed(() => $q.screen.lt.md && !$q.screen.lt.sm)

  const timelineLayout = computed(() => {
    if ($q.screen.lt.sm) {
      return 'dense'
    }

    if ($q.screen.lt.md) {
      return 'comfortable'
    }

    return 'loose'
  })

const pageSize = computed(() =>
  $q.screen.lt.sm ? 4 : 6,
)

const techPageSize = computed(() =>
  $q.screen.lt.sm ? 4 : 12,
)

return {
  isMobile,
  isTablet,
  timelineLayout,
  pageSize,
  techPageSize,
}
}