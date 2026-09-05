<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

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

const currentSlide = ref(0)

const selectedTestimonial =
  ref<TestimonialItem | null>(null)

const dialogVisible = ref(false)

const isHovered = ref(false)

const isMobileModel = ref(false)

const overflowingTestimonials =
  ref<Record<string, boolean>>({})

const testimonialTextRefs =
  new Map<string, HTMLElement>()

let autoplayTimer: ReturnType<
  typeof setInterval
> | null = null

let resizeObserver: ResizeObserver | null = null

const testimonials = computed<TestimonialItem[]>(
  () => {
    const items =
      portfolio.value?.experiences?.flatMap(
        (experience) =>
          experience.testimonials ?? [],
      ) ?? []

    return [...items].sort(
      (a, b) =>
        (a.sortOrder ?? 0) -
        (b.sortOrder ?? 0),
    )
  },
)

const cardsPerSlide = computed(() => {
  return isMobile.value ? 1 : 3
})

const testimonialSlides = computed(() => {
  const slides: TestimonialItem[][] = []

  for (
    let index = 0;
    index < testimonials.value.length;
    index += cardsPerSlide.value
  ) {
    slides.push(
      testimonials.value.slice(
        index,
        index + cardsPerSlide.value,
      ),
    )
  }

  return slides
})

const totalSlides = computed(() => {
  return testimonialSlides.value.length
})

function updateViewport() {
  const previousMobileState =
    isMobileModel.value

  isMobileModel.value =
    window.innerWidth < 768

  if (
    previousMobileState !==
    isMobileModel.value
  ) {
    currentSlide.value = 0
  }
}

function setTestimonialTextRef(
  id: string,
  element: unknown,
) {
  if (element instanceof HTMLElement) {
    testimonialTextRefs.set(
      id,
      element,
    )

    return
  }

  testimonialTextRefs.delete(id)
}

async function detectTextOverflow() {
  await nextTick()

  const result: Record<
    string,
    boolean
  > = {}

  testimonials.value.forEach(
    (testimonial) => {
      const element =
        testimonialTextRefs.get(
          testimonial.id,
        )

      if (!element) {
        return
      }

      result[testimonial.id] =
        element.scrollHeight >
        element.clientHeight + 1
    },
  )

  overflowingTestimonials.value =
    result
}

function isTestimonialOverflowing(
  id: string,
) {
  return (
    overflowingTestimonials.value[id] ??
    false
  )
}

function getImageFileName(
  avatarUrl: string | null,
) {
  if (!avatarUrl) {
    return null
  }

  const cleanUrl =
    avatarUrl.split('?')[0]

  if (!cleanUrl) {
    return null
  }

  const fileName =
    cleanUrl.split('/').pop()

  return fileName || null
}

function getTestimonialAvatar(
  avatarUrl: string | null,
) {
  const fileName =
    getImageFileName(avatarUrl)

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
    .map(
      (part) =>
        part.charAt(0).toUpperCase(),
    )
    .join('')
}

function openTestimonial(
  testimonial: TestimonialItem,
) {
  stopAutoplay()

  selectedTestimonial.value =
    testimonial

  dialogVisible.value = true
}

function closeTestimonial() {
  dialogVisible.value = false
  selectedTestimonial.value = null

  if (!isHovered.value) {
    startAutoplay()
  }
}

function startAutoplay() {
  stopAutoplay()

  if (totalSlides.value <= 1) {
    return
  }

  if (dialogVisible.value) {
    return
  }

  if (isHovered.value) {
    return
  }

  autoplayTimer = setInterval(() => {
    if (
      dialogVisible.value ||
      isHovered.value ||
      totalSlides.value <= 1
    ) {
      return
    }

    currentSlide.value =
      (currentSlide.value + 1) %
      totalSlides.value

    detectTextOverflow()
  }, 5000)
}

function stopAutoplay() {
  if (!autoplayTimer) {
    return
  }

  clearInterval(autoplayTimer)

  autoplayTimer = null
}

function pauseCarousel() {
  isHovered.value = true
  stopAutoplay()
}

function resumeCarousel() {
  isHovered.value = false
  startAutoplay()
}

function handleSlideChange(
  slide: string | number,
) {
  currentSlide.value = Number(slide)

  detectTextOverflow()
}

async function goToPreviousSlide() {
  currentSlide.value =
    currentSlide.value === 0
      ? totalSlides.value - 1
      : currentSlide.value - 1

  await detectTextOverflow()
}

async function goToNextSlide() {
  currentSlide.value =
    (currentSlide.value + 1) %
    totalSlides.value

  await detectTextOverflow()
}

watch(
  () => cardsPerSlide.value,
  async () => {
    currentSlide.value = 0

    await nextTick()

    await detectTextOverflow()

    startAutoplay()
  },
)

watch(
  testimonials,
  async () => {
    await nextTick()

    await detectTextOverflow()
  },
)

watch(
  () => dialogVisible.value,
  (visible) => {
    if (visible) {
      stopAutoplay()
      return
    }

    if (!isHovered.value) {
      startAutoplay()
    }
  },
)

onMounted(async () => {
  updateViewport()

  window.addEventListener(
    'resize',
    updateViewport,
  )

  await nextTick()

  await detectTextOverflow()

  resizeObserver =
    new ResizeObserver(() => {
      detectTextOverflow()
    })

  testimonialTextRefs.forEach(
    (element) => {
      resizeObserver?.observe(element)
    },
  )

  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()

  window.removeEventListener(
    'resize',
    updateViewport,
  )

  resizeObserver?.disconnect()
  resizeObserver = null

  testimonialTextRefs.clear()
})
</script>

<template>
  <section
    id="depoimentos"
    class="q-py-xl"
  >
    <div class="wrapper">
      <!-- Cabeçalho -->
      <div
        class="testimonial-heading q-mb-xl"
      >
        <div
          class="text-overline text-primary text-weight-bold"
        >
          Depoimentos
        </div>

        <div class="text-weight-bold" :class="isMobile ? 'text-h4' : 'text-h3'">
          O que dizem sobre meu trabalho
        </div>

        <div class="text-body1 q-mt-md">
          Ao longo da minha trajetória
          profissional, tive a oportunidade
          de trabalhar com diferentes equipes,
          projetos e desafios. Confira alguns
          depoimentos de pessoas com quem
          compartilhei essa jornada.
        </div>
      </div>

      <!-- Carousel -->
      <div
        v-if="testimonialSlides.length"
        class="testimonial-carousel-wrapper"
        @mouseenter="pauseCarousel"
        @mouseleave="resumeCarousel"
      >
        <q-carousel
          :model-value="currentSlide"
          class="testimonial-carousel"
          animated
          swipeable
          infinite
          control-color="primary"
          transition-prev="slide-right"
          transition-next="slide-left"
          @update:model-value="
            handleSlideChange
          "
        >
          <q-carousel-slide
            v-for="(
              slide, slideIndex
            ) in testimonialSlides"
            :key="slideIndex"
            :name="slideIndex"
            class="testimonial-slide"
          >
            <div
              class="testimonial-grid"
            >
              <q-card
                v-for="testimonial in slide"
                :key="testimonial.id"
                flat
                bordered
                clickable
                class="testimonial-card bg-transparent"
                @click="
                  openTestimonial(
                    testimonial,
                  )
                "
              >
                <q-card-section
                  class="testimonial-card-content"
                >
                  <!-- Citação -->
                  <div
                    class="testimonial-quote"
                  >
                    <q-icon
                      name="mdi-format-quote-open"
                      size="34px"
                      color="primary"
                    />
                  </div>

                  <!-- Conteúdo -->
                  <div
                    :ref="
                      (element) =>
                        setTestimonialTextRef(
                          testimonial.id,
                          element,
                        )
                    "
                    class="testimonial-content text-body1"
                    :class="{
                      'testimonial-content-truncated':
                        isTestimonialOverflowing(
                          testimonial.id,
                        ),
                    }"
                  >
                    {{ testimonial.content }}
                  </div>

                  <!-- Ler depoimento -->
                  <div
                    v-if="
                      isTestimonialOverflowing(
                        testimonial.id,
                      )
                    "
                    class="testimonial-read-more"
                  >
                    <span>
                      Ler depoimento
                    </span>

                    <q-icon
                      name="mdi-arrow-right"
                      size="18px"
                    />
                  </div>

                  <!-- Autor -->
                  <div
                    class="testimonial-author"
                  >
                    <q-avatar
                      size="52px"
                      class="testimonial-avatar"
                    >
                      <img
                        v-if="
                          getTestimonialAvatar(
                            testimonial.avatarUrl,
                          )
                        "
                        :src="
                          getTestimonialAvatar(
                            testimonial.avatarUrl,
                          ) ?? undefined
                        "
                        :alt="
                          `Foto de ${testimonial.name}`
                        "
                      />

                      <span
                        v-else
                        class="testimonial-initials"
                      >
                        {{
                          getInitials(
                            testimonial.name,
                          )
                        }}
                      </span>
                    </q-avatar>

                    <div
                      class="testimonial-author-info"
                    >
                      <div
                        class="text-body1 text-weight-bold"
                      >
                        {{
                          testimonial.name
                        }}
                      </div>

                      <div
                        v-if="
                          testimonial.company
                        "
                        class="text-caption text-primary text-weight-medium"
                      >
                        {{
                          testimonial.company
                        }}
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-carousel-slide>

          <!-- Setas -->
          <template #control>
            <q-carousel-control
              position="bottom-left"
              :offset="[0, 16]"
            >
              <q-btn
                round
                flat
                class="bg-primary"
                icon="mdi-chevron-left"
                aria-label="Depoimento anterior"
                @click="
                  goToPreviousSlide()
                "
              />
            </q-carousel-control>

            <q-carousel-control
              position="bottom-right"
              :offset="[0, 16]"
            >
              <q-btn
                round
                flat
                class="bg-primary"
                icon="mdi-chevron-right"
                aria-label="Próximo depoimento"
                @click="
                  goToNextSlide()
                "
              />
            </q-carousel-control>
          </template>
        </q-carousel>

        <!-- Indicadores -->
        <div
          v-if="totalSlides > 1"
          class="testimonial-indicators"
        >
          <button
            v-for="(
              _, index
            ) in testimonialSlides"
            :key="index"
            type="button"
            class="testimonial-indicator"
            :class="{
              'testimonial-indicator-active':
                currentSlide === index,
            }"
            :aria-label="
              `Ir para depoimentos ${index + 1}`
            "
            :aria-current="
              currentSlide === index
                ? 'true'
                : undefined
            "
            @click="
              currentSlide = index
            "
          />
        </div>
      </div>

      <!-- Estado vazio -->
      <div
        v-else
        class="testimonial-empty"
      >
        <q-icon
          name="mdi-comment-quote-outline"
          size="48px"
          color="primary"
        />

        <div
          class="text-body1 q-mt-md"
        >
          Nenhum depoimento disponível.
        </div>
      </div>
    </div>

    <!-- Dialog -->
    <q-dialog
      v-model="dialogVisible"
      @hide="closeTestimonial"
    >
      <q-card
        class="testimonial-dialog bg-transparent backdrop-blur"
      >
        <q-btn
          round
          flat
          dense
          icon="mdi-close"
          color="grey-7"
          aria-label="Fechar depoimento"
          class="testimonial-dialog-close"
          v-close-popup
        />

        <q-card-section
          v-if="selectedTestimonial"
          class="testimonial-dialog-content"
        >
          <!-- Autor -->
          <div
            class="testimonial-dialog-author"
          >
            <q-avatar
              size="76px"
              class="testimonial-avatar"
            >
              <img
                v-if="
                  getTestimonialAvatar(
                    selectedTestimonial.avatarUrl,
                  )
                "
                :src="
                  getTestimonialAvatar(
                    selectedTestimonial.avatarUrl,
                  ) ?? undefined
                "
                :alt="
                  `Foto de ${selectedTestimonial.name}`
                "
              />

              <span
                v-else
                class="testimonial-initials"
              >
                {{
                  getInitials(
                    selectedTestimonial.name,
                  )
                }}
              </span>
            </q-avatar>

            <div
              class="testimonial-dialog-author-info"
            >
              <div
                class="text-h6 text-weight-bold"
              >
                {{
                  selectedTestimonial.name
                }}
              </div>

              <div
                v-if="
                  selectedTestimonial.company
                "
                class="text-body2 text-primary text-weight-medium"
              >
                {{
                  selectedTestimonial.company
                }}
              </div>
            </div>
          </div>

          <!-- Conteúdo completo -->
          <div
            class="testimonial-dialog-quote q-mt-xl"
          >
            <q-icon
              name="mdi-format-quote-open"
              size="42px"
              color="primary"
            />
          </div>

          <div
            class="testimonial-dialog-text q-mt-sm"
          >
            {{
              selectedTestimonial.content
            }}
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </section>
</template>

<style scoped>
.testimonial-heading {
  max-width: 850px;
}

.testimonial-carousel-wrapper {
  position: relative;
}

.testimonial-carousel {
  height: 420px;
  background: transparent;
}

.testimonial-slide {
  padding: 16px 48px 56px;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(
    3,
    minmax(0, 1fr)
  );
  gap: 24px;

}

.testimonial-card {
  min-width: 0;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    background-color 0.25s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  border-color: rgba(
    0,
    212,
    255,
    0.5
  );
}

.testimonial-card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 28px;
}

.testimonial-quote {
  line-height: 1;
  margin-bottom: 12px;
}

.testimonial-content {
  height: 10.2em;
  min-height: 10.2em;
  overflow: hidden;
  line-height: 1.7;
  color: inherit;
}

.testimonial-content-truncated {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  line-clamp: 6;
  text-overflow: ellipsis;
}

.testimonial-read-more {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  color: #00d4ff;
  font-size: 14px;
  font-weight: 700;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: auto;
  padding-top: 22px;
}

.testimonial-avatar {
  flex-shrink: 0;
  overflow: hidden;
  background: rgba(
    0,
    212,
    255,
    0.12
  );
}

.testimonial-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

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

.testimonial-author-info {
  min-width: 0;
}

.testimonial-author-info
  .text-body1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.testimonial-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
}

.testimonial-indicator {
  width: 8px;
  height: 8px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #64748b;
  cursor: pointer;
  opacity: 0.55;
  transition:
    width 0.2s ease,
    background-color 0.2s ease,
    opacity 0.2s ease;
}

.testimonial-indicator-active {
  width: 24px;
  border-radius: 8px;
  background: #00d4ff;
  opacity: 1;
}

.testimonial-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  text-align: center;
}

.testimonial-dialog {
  position: relative;
  width: min(
    720px,
    calc(100vw - 32px)
  );
  max-width: 720px;
  border-radius: 20px;
  overflow: hidden;
}

.testimonial-dialog-content {
  padding: 36px;
}

.testimonial-dialog-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
}

.testimonial-dialog-author {
  display: flex;
  align-items: center;
  gap: 18px;
  padding-right: 36px;
}

.testimonial-dialog-author-info {
  min-width: 0;
}

.testimonial-dialog-quote {
  line-height: 1;
}

.testimonial-dialog-text {
  max-height: 55vh;
  overflow-y: auto;
  padding-right: 8px;
  font-size: 17px;
  line-height: 1.8;
  white-space: pre-line;
}

@media (max-width: 767px) {
  .testimonial-carousel {
    height: 470px;
  }

  .testimonial-slide {
    padding: 16px 36px 56px;
  }

  .testimonial-grid {
    grid-template-columns: 1fr;
  }

  .testimonial-card {
    height: 100%;
  }

  .testimonial-card-content {
    padding: 24px;
  }

  .testimonial-content {
    height: 10.2em;
    min-height: 10.2em;
  }

  .testimonial-dialog {
    width: calc(100vw - 24px);
    border-radius: 16px;
  }

  .testimonial-dialog-content {
    padding: 28px 24px;
  }

  .testimonial-dialog-author {
    gap: 14px;
  }

  .testimonial-dialog-text {
    max-height: 60vh;
    font-size: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .testimonial-card {
    transition: none;
  }

  .testimonial-indicator {
    transition: none;
  }
}
</style>