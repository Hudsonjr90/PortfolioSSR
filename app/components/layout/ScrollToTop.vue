<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

const isVisible = ref(false)

let ticking = false

function updateVisibility() {
  const contactSection =
    document.getElementById('contato')

  if (!contactSection) {
    isVisible.value = false
    return
  }

  const contactTop =
    contactSection.getBoundingClientRect().top

  const triggerPoint =
    window.innerHeight * 0.75

  isVisible.value =
    contactTop <= triggerPoint
}

function handleScroll() {
  if (ticking) {
    return
  }

  ticking = true

  window.requestAnimationFrame(() => {
    updateVisibility()
    ticking = false
  })
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  window.addEventListener(
    'scroll',
    handleScroll,
    { passive: true },
  )

  updateVisibility()
})

onBeforeUnmount(() => {
  window.removeEventListener(
    'scroll',
    handleScroll,
  )
})
</script>

<template>
  <transition
    enter-active-class="scroll-top-enter-active"
    leave-active-class="scroll-top-leave-active"
    enter-from-class="scroll-top-enter-from"
    leave-to-class="scroll-top-leave-to"
  >
    <q-btn
      v-if="isVisible"
      round
      unelevated
      color="primary"
      icon="mdi-arrow-up"
      aria-label="Voltar ao topo"
      class="scroll-top-button"
      @click="scrollToTop"
    >
      <q-tooltip>
        Voltar ao topo
      </q-tooltip>
    </q-btn>
  </transition>
</template>

<style scoped>
.scroll-top-button {
  position: fixed;
  right: 28px;
  bottom: 88px;
  z-index: 2000;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--q-light);
}

.scroll-top-enter-active,
.scroll-top-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 599px) {
  .scroll-top-button {
    right: 18px;
    bottom: 18px;
    width: 44px;
    height: 44px;
  }
}
</style>