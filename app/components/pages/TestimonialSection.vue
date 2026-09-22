<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface TestimonialItem {
  id: string
  name: string
  role: string | null
  company: string | null
  content: string
  avatarUrl: string | null
  sortOrder: number
}

const { data: portfolio } = usePortfolio()
const { isMobile } = useMobile()

const VISIBLE_PEOPLE = 3
const MIN_READING_TIME = 6000
const MAX_READING_TIME = 16000
const WORDS_PER_MINUTE = 200

const activeIndex = ref(0)
const progress = ref(0)
const isPaused = ref(false)

let animationFrame: number | null = null
let startedAt = 0
let elapsedBeforePause = 0

/* ======================================================
 * DATA
 * ====================================================== */

const testimonials = computed<TestimonialItem[]>(() => {
  const items =
    portfolio.value?.experiences?.flatMap((experience) => experience.testimonials ?? []) ?? []

  return [...items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
})

const activeTestimonial = computed(() => {
  return testimonials.value[activeIndex.value] ?? null
})

/*
 * Exibe no máximo três pessoas.
 *
 * Sempre que possível, o depoimento ativo permanece
 * no centro da lista:
 *
 * ativo 0 -> 0, 1, 2
 * ativo 1 -> 0, 1, 2
 * ativo 2 -> 1, 2, 3
 * ativo 3 -> 2, 3, 4
 */
const visibleTestimonials = computed(() => {
  const total = testimonials.value.length

  if (total <= VISIBLE_PEOPLE) {
    return testimonials.value.map((testimonial, index) => ({
      testimonial,
      index,
    }))
  }

  let start = activeIndex.value - 1

  start = Math.max(0, start)
  start = Math.min(start, total - VISIBLE_PEOPLE)

  return testimonials.value.slice(start, start + VISIBLE_PEOPLE).map((testimonial, offset) => ({
    testimonial,
    index: start + offset,
  }))
})

/* ======================================================
 * READING TIME
 * ====================================================== */

const readingDuration = computed(() => {
  if (!activeTestimonial.value) {
    return MIN_READING_TIME
  }

  return getReadingTime(activeTestimonial.value.content)
})

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length

  const duration = (words / WORDS_PER_MINUTE) * 60_000

  return Math.min(MAX_READING_TIME, Math.max(MIN_READING_TIME, duration))
}

/* ======================================================
 * PROGRESS RING
 * ====================================================== */

const progressDashOffset = computed(() => {
  /*
   * Circunferência:
   *
   * 2 * PI * 46 ≈ 289.03
   */
  const circumference = 2 * Math.PI * 46

  return circumference - (progress.value / 100) * circumference
})

/* ======================================================
 * AVATAR
 * ====================================================== */

function getImageFileName(avatarUrl: string | null) {
  if (!avatarUrl) {
    return null
  }

  const cleanUrl = avatarUrl.split('?')[0]

  if (!cleanUrl) {
    return null
  }

  const fileName = cleanUrl.split('/').pop()

  return fileName || null
}

function getTestimonialAvatar(avatarUrl: string | null) {
  const fileName = getImageFileName(avatarUrl)

  if (!fileName) {
    return null
  }

  return `/images/testimonials/${fileName}`
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

/* ======================================================
 * PROGRESS
 * ====================================================== */

function startProgress() {
  stopAnimation()

  if (testimonials.value.length <= 1 || isPaused.value) {
    return
  }

  startedAt = performance.now()

  animationFrame = requestAnimationFrame(updateProgress)
}

function updateProgress(timestamp: number) {
  if (isPaused.value) {
    return
  }

  const currentElapsed = elapsedBeforePause + (timestamp - startedAt)

  const percentage = (currentElapsed / readingDuration.value) * 100

  progress.value = Math.min(percentage, 100)

  if (percentage >= 100) {
    goToNextTestimonial()
    return
  }

  animationFrame = requestAnimationFrame(updateProgress)
}

function stopAnimation() {
  if (animationFrame === null) {
    return
  }

  cancelAnimationFrame(animationFrame)
  animationFrame = null
}

function resetProgress() {
  stopAnimation()

  progress.value = 0
  elapsedBeforePause = 0
  startedAt = performance.now()
}

function pauseProgress() {
  if (isPaused.value) {
    return
  }

  isPaused.value = true

  if (startedAt) {
    elapsedBeforePause += performance.now() - startedAt
  }

  stopAnimation()
}

function resumeProgress() {
  if (!isPaused.value) {
    return
  }

  isPaused.value = false

  startProgress()
}

/* ======================================================
 * NAVIGATION
 * ====================================================== */

function selectTestimonial(index: number) {
  if (index < 0 || index >= testimonials.value.length) {
    return
  }

  activeIndex.value = index

  resetProgress()

  if (!isPaused.value) {
    startProgress()
  }
}

function goToNextTestimonial() {
  if (!testimonials.value.length) {
    return
  }

  activeIndex.value = (activeIndex.value + 1) % testimonials.value.length

  resetProgress()

  if (!isPaused.value) {
    startProgress()
  }
}

function goToPreviousTestimonial() {
  if (!testimonials.value.length) {
    return
  }

  activeIndex.value =
    activeIndex.value === 0 ? testimonials.value.length - 1 : activeIndex.value - 1

  resetProgress()

  if (!isPaused.value) {
    startProgress()
  }
}

/* ======================================================
 * WATCHERS
 * ====================================================== */

watch(
  () => testimonials.value.length,
  (total) => {
    if (!total) {
      stopAnimation()
      activeIndex.value = 0
      progress.value = 0
      return
    }

    if (activeIndex.value >= total) {
      activeIndex.value = 0
    }

    resetProgress()

    if (!isPaused.value) {
      startProgress()
    }
  },
)

/* ======================================================
 * LIFECYCLE
 * ====================================================== */

onMounted(() => {
  startProgress()
})

onBeforeUnmount(() => {
  stopAnimation()
})
</script>

<template>
  <section id="depoimentos" class="q-py-md">
    <div class="wrapper">
      <!-- =================================================
           HEADER
           ================================================= -->

      <div class="testimonial-heading q-mb-xl">
        <div class="text-overline text-primary text-weight-bold">Depoimentos</div>

        <div class="text-weight-bold" :class="isMobile ? 'text-h4' : 'text-h3'">
          O que dizem sobre meu trabalho
        </div>

        <div class="text-body1 q-mt-md">
          Ao longo da minha trajetória profissional, tive a oportunidade de trabalhar com diferentes
          equipes, projetos e desafios. Confira alguns depoimentos de pessoas com quem compartilhei
          essa jornada.
        </div>
      </div>

      <!-- =================================================
           TESTIMONIALS
           ================================================= -->

      <div
        v-if="testimonials.length && activeTestimonial"
        class="testimonials-showcase"
        @mouseenter="pauseProgress"
        @mouseleave="resumeProgress"
      >
        <!-- ===============================================
             PEOPLE
             =============================================== -->

        <div class="testimonial-people">
          <TransitionGroup name="testimonial-person-list">
            <button
              v-for="{ testimonial, index } in visibleTestimonials"
              :key="testimonial.id"
              type="button"
              class="testimonial-person"
              :class="{
                'testimonial-person-active': activeIndex === index,
              }"
              :aria-label="`Ver depoimento de ${testimonial.name}`"
              :aria-current="activeIndex === index ? 'true' : undefined"
              @click="selectTestimonial(index)"
            >
              <!-- Avatar + progress -->

              <div class="testimonial-avatar-progress">
                <svg class="testimonial-progress-ring" viewBox="0 0 100 100" aria-hidden="true">
                  <circle class="testimonial-progress-track" cx="50" cy="50" r="46" />

                  <circle
                    v-if="activeIndex === index"
                    class="testimonial-progress-value"
                    cx="50"
                    cy="50"
                    r="46"
                    :style="{
                      strokeDashoffset: progressDashOffset,
                    }"
                  />
                </svg>

                <q-avatar size="64px" class="testimonial-person-avatar">
                  <img
                    v-if="getTestimonialAvatar(testimonial.avatarUrl)"
                    :src="getTestimonialAvatar(testimonial.avatarUrl) ?? undefined"
                    :alt="`Foto de ${testimonial.name}`"
                  />

                  <span v-else class="testimonial-initials">
                    {{ getInitials(testimonial.name) }}
                  </span>
                </q-avatar>
              </div>

              <!-- Person info -->

              <!-- <div
                class="testimonial-person-info"
              >
                <span
                  class="testimonial-person-name"
                >
                  {{ testimonial.name }}
                </span>

                <span
                  v-if="testimonial.company"
                  class="testimonial-person-company"
                >
                  {{ testimonial.company }}
                </span>
              </div> -->
            </button>
          </TransitionGroup>
        </div>

        <!-- ===============================================
             ACTIVE TESTIMONIAL
             =============================================== -->

        <div class="testimonial-stage">
          <Transition name="testimonial-change" mode="out-in">
            <article :key="activeTestimonial.id" class="testimonial-active">
              <q-icon
                name="mdi-format-quote-open"
                size="42px"
                color="primary"
                class="testimonial-quote"
              />

              <blockquote class="testimonial-text">
                {{ activeTestimonial.content }}
              </blockquote>
              

              <!-- Author -->

              <div class="testimonial-footer">
                <div>
                  <div class="testimonial-active-name">
                    {{ activeTestimonial.name }}
                  </div>

                  <div
                    v-if="activeTestimonial.role || activeTestimonial.company"
                    class="testimonial-active-meta"
                  >
                    <span v-if="activeTestimonial.role">
                      {{ activeTestimonial.role }}
                    </span>

                    <span v-if="activeTestimonial.role && activeTestimonial.company"> · </span>

                    <span v-if="activeTestimonial.company">
                      {{ activeTestimonial.company }}
                    </span>

                  </div>
                </div>
              </div>
            </article>
          </Transition>

          <!-- =============================================
               NAVIGATION
               ============================================= -->

          <div v-if="testimonials.length > 1" class="testimonial-navigation">
            <q-btn
              round
              flat
              icon="mdi-chevron-left"
              aria-label="Depoimento anterior"
              @click="goToPreviousTestimonial"
            />

            <span class="testimonial-counter">
              {{ String(activeIndex + 1).padStart(2, '0') }}

              <span class="testimonial-counter-divider"> / </span>

              {{ String(testimonials.length).padStart(2, '0') }}
            </span>

            <q-btn
              round
              flat
              icon="mdi-chevron-right"
              aria-label="Próximo depoimento"
              @click="goToNextTestimonial"
            />
          </div>
        </div>
      </div>

      <!-- =================================================
           EMPTY
           ================================================= -->

      <div v-else class="testimonial-empty">
        <q-icon name="mdi-comment-quote-outline" size="48px" color="primary" />

        <div class="text-body1 q-mt-md">Nenhum depoimento disponível.</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ======================================================
   HEADER
   ====================================================== */

.testimonial-heading {
  max-width: 850px;
}

/* ======================================================
   MAIN LAYOUT
   ====================================================== */

.testimonials-showcase {
  display: grid;
  grid-template-columns:
    220px
    minmax(0, 1fr);
  align-items: center;
  min-height: 460px;
}

/* ======================================================
   PEOPLE
   ====================================================== */

.testimonial-people {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  margin-left: 4rem;
  margin-top: -4rem;
}

/* ======================================================
   PERSON
   ====================================================== */

.testimonial-person {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 6px;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  opacity: 0.42;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.testimonial-person:hover {
  opacity: 0.75;
}

.testimonial-person-active {
  opacity: 1;

  transform: translateX(8px);
}

/* ======================================================
   AVATAR + CIRCULAR PROGRESS
   ====================================================== */

.testimonial-avatar-progress {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 78px;
  flex: 0 0 78px;
}

/* SVG */

.testimonial-progress-ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  overflow: visible;
}

/* Rings */

.testimonial-progress-track,
.testimonial-progress-value {
  fill: none;
  stroke-width: 3;
}

.testimonial-progress-track {
  stroke: rgba(100, 116, 139, 0.22);
}

.testimonial-progress-value {
  stroke: #00d4ff;
  stroke-linecap: round;
  stroke-dasharray: 289.03;
  stroke-dashoffset: 289.03;
  filter: drop-shadow(0 0 4px rgba(0, 212, 255, 0.45));
}

.testimonial-person-avatar {
  position: relative;
  z-index: 1;
  overflow: hidden;
  background: rgba(0, 212, 255, 0.12);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.testimonial-person-active .testimonial-person-avatar {
  transform: scale(1.04);
  box-shadow:
    0 0 0 3px rgba(0, 212, 255, 0.08),
    0 8px 30px rgba(0, 212, 255, 0.12);
}

.testimonial-person-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Initials */

.testimonial-initials {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #00d4ff;
  font-size: 18px;
  font-weight: 700;
}

/* ======================================================
   PERSON INFO
   ====================================================== */

.testimonial-person-info {
  display: flex;

  flex-direction: column;

  min-width: 0;
}

.testimonial-person-name {
  overflow: hidden;

  font-size: 15px;
  font-weight: 700;

  text-overflow: ellipsis;

  white-space: nowrap;
}

.testimonial-person-company {
  margin-top: 2px;

  overflow: hidden;

  color: #00d4ff;

  font-size: 12px;

  text-overflow: ellipsis;

  white-space: nowrap;
}

/* ======================================================
   ACTIVE TESTIMONIAL
   ====================================================== */

.testimonial-stage {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-width: 0;
  min-height: 360px;
}

.testimonial-active {
  width: 100%;

  max-width: 100%;
}

/* Quote icon */

.testimonial-quote {
  margin-bottom: 14px;
}

/* Text */

.testimonial-text {
  width: 100%;
  margin: 0;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.55;
  letter-spacing: -0.015em;
  white-space: pre-line;
}

/* ======================================================
   AUTHOR
   ====================================================== */

.testimonial-footer {
  display: flex;

  align-items: flex-end;
  justify-content: space-between;

  margin-top: 38px;
}

.testimonial-active-name {
  font-size: 18px;

  font-weight: 700;
}

.testimonial-active-meta {
  display: flex;

  flex-wrap: wrap;

  gap: 5px;

  margin-top: 4px;

  color: #00d4ff;

  font-size: 14px;
}

/* ======================================================
   NAVIGATION
   ====================================================== */

.testimonial-navigation {
  display: flex;

  align-items: center;

  gap: 8px;

  margin-top: 34px;
}

.testimonial-navigation :deep(.q-btn) {
  color: inherit;

  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.testimonial-navigation :deep(.q-btn:hover) {
  color: #00d4ff;

  background: rgba(0, 212, 255, 0.08);

  transform: scale(1.05);
}

/* Counter */

.testimonial-counter {
  min-width: 68px;

  color: #94a3b8;

  font-size: 12px;

  font-weight: 600;

  text-align: center;

  letter-spacing: 0.08em;
}

.testimonial-counter-divider {
  margin: 0 3px;

  opacity: 0.45;
}

/* ======================================================
   PEOPLE LIST TRANSITION
   ====================================================== */

.testimonial-person-list-move,
.testimonial-person-list-enter-active,
.testimonial-person-list-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.testimonial-person-list-enter-from {
  opacity: 0;

  transform: translateY(16px);
}

.testimonial-person-list-leave-to {
  opacity: 0;

  transform: translateY(-16px);
}

/*
 * Evita que o item saindo empurre os demais
 * durante a animação.
 */
.testimonial-person-list-leave-active {
  position: absolute;
}

/* ======================================================
   TESTIMONIAL CHANGE
   ====================================================== */

.testimonial-change-enter-active,
.testimonial-change-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.testimonial-change-enter-from {
  opacity: 0;

  transform: translateY(16px);
}

.testimonial-change-leave-to {
  opacity: 0;

  transform: translateY(-10px);
}

/* ======================================================
   EMPTY
   ====================================================== */

.testimonial-empty {
  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  min-height: 240px;

  text-align: center;
}

/* ======================================================
   TABLET
   ====================================================== */

@media (max-width: 1023px) {
  .testimonials-showcase {
    grid-template-columns:
      110px
      minmax(0, 1fr);

    gap: 42px;
  }

  .testimonial-people {
    align-items: center;
  }

  .testimonial-person {
    width: auto;
  }

  .testimonial-person-info {
    display: none;
  }
}

/* ======================================================
   MOBILE
   ====================================================== */

@media (max-width: 767px) {
  .testimonials-showcase {
    display: flex;

    flex-direction: column;

    align-items: stretch;

    gap: 28px;

    min-height: auto;
  }

  .testimonial-people {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    min-height: 78px;
    padding: 4px 0;
  }

  .testimonial-person {
    width: auto;
    flex: 0 0 auto;
    padding: 3px;
    opacity: 0.42;
  }

  .testimonial-person-active {
    opacity: 1;
    transform: none;
  }

  .testimonial-avatar-progress {
    width: 70px;
    height: 70px;
    flex-basis: 70px;
  }

  .testimonial-person-avatar {
    width: 56px !important;
    height: 56px !important;
  }

  .testimonial-person-list-leave-active {
    position: relative;
  }

  .testimonial-stage {
    width: 100%;
    min-height: 390px;
  }

  .testimonial-quote {
    margin-bottom: 10px;
  }

  .testimonial-text {
    font-size: 16px;
    line-height: 1.65;
  }

  .testimonial-footer {
    margin-top: 30px;
  }

  .testimonial-active-name {
    font-size: 17px;
  }

  .testimonial-active-meta {
    font-size: 13px;
  }

  /* Navigation */

  .testimonial-navigation {
    margin-top: 26px;
    justify-content: center;
  }
}

/* ======================================================
   SMALL MOBILE
   ====================================================== */

@media (max-width: 420px) {
  .testimonial-people {
    gap: 8px;
  }

  .testimonial-avatar-progress {
    width: 66px;
    height: 66px;

    flex-basis: 66px;
  }

  .testimonial-person-avatar {
    width: 52px !important;
    height: 52px !important;
  }

  .testimonial-text {
    font-size: 16px;
  }
}

/* ======================================================
   REDUCED MOTION
   ====================================================== */

@media (prefers-reduced-motion: reduce) {
  .testimonial-person,
  .testimonial-person-avatar,
  .testimonial-navigation :deep(.q-btn),
  .testimonial-person-list-move,
  .testimonial-person-list-enter-active,
  .testimonial-person-list-leave-active,
  .testimonial-change-enter-active,
  .testimonial-change-leave-active {
    transition: none;
  }
}
</style>
