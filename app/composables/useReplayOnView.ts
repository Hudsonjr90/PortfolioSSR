import { ref, watch, type Ref } from 'vue'

export function useReplayOnView(target: Ref<HTMLElement | null>, threshold = 0.2) {
  const isReset = ref(false)

  watch(
    target,
    (element, _previous, onCleanup) => {
      if (!element || typeof IntersectionObserver === 'undefined') return

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[entries.length - 1]
          if (!entry) return

          if (!entry.isIntersecting) {
            isReset.value = true
          } else if (entry.intersectionRatio >= threshold) {
            isReset.value = false
          }
        },
        { threshold: [0, threshold] },
      )

      observer.observe(element)
      onCleanup(() => observer.disconnect())
    },
    { flush: 'post' },
  )

  return { isReset }
}