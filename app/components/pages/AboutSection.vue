<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import profileImage from '~/assets/images/profile/my.webp'

const { data: portfolio, pending, error } = usePortfolio()

const { isMobile } = useMobile()
const { isDark } = useTheme()

const activePrinciple = ref('0')
const isAboutExpanded = ref(false)
const pixelCanvas = ref<HTMLCanvasElement | null>(null)

let pixelEffectImage: HTMLImageElement | null = null

function getPixelEffectImage() {
  if (pixelEffectImage) return pixelEffectImage

  pixelEffectImage = new Image()
  pixelEffectImage.src = profileImage
  return pixelEffectImage
}

function drawPixelEffect() {
  const canvas = pixelCanvas.value
  if (!canvas) return

  const size = canvas.clientWidth
  if (!size) return

  const image = getPixelEffectImage()
  if (!image.complete) {
    image.addEventListener('load', drawPixelEffect, { once: true })
    return
  }

  const pixelRatio = window.devicePixelRatio || 1
  const gridSize = 52
  const pixelSize = size / gridSize
  const sourceSize = Math.min(image.naturalWidth, image.naturalHeight)
  const sourceX = (image.naturalWidth - sourceSize) / 2
  const sourceY = (image.naturalHeight - sourceSize) / 2
  const buffer = document.createElement('canvas')
  const bufferContext = buffer.getContext('2d', { willReadFrequently: true })
  const context = canvas.getContext('2d')

  if (!bufferContext || !context) return

  canvas.width = Math.round(size * pixelRatio)
  canvas.height = Math.round(size * pixelRatio)
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

  buffer.width = gridSize
  buffer.height = gridSize
  bufferContext.imageSmoothingEnabled = false
  bufferContext.drawImage(
    image,
    sourceX,
    sourceY,
    sourceSize,
    sourceSize,
    0,
    0,
    gridSize,
    gridSize,
  )

  const pixels = bufferContext.getImageData(0, 0, gridSize, gridSize).data
  context.fillStyle = '#050505'
  context.fillRect(0, 0, size, size)

  for (let y = 0; y < gridSize; y += 1) {
    for (let x = 0; x < gridSize; x += 1) {
      const noise = Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1
      if (noise < 0.22) continue

      const index = (y * gridSize + x) * 4
      context.fillStyle = `rgb(${pixels[index]}, ${pixels[index + 1]}, ${pixels[index + 2]})`
      context.fillRect(x * pixelSize + 0.75, y * pixelSize + 0.75, pixelSize - 1.5, pixelSize - 1.5)
    }
  }
}

function clearPixelEffect() {
  const canvas = pixelCanvas.value
  const context = canvas?.getContext('2d')

  if (canvas && context) context.clearRect(0, 0, canvas.width, canvas.height)
}

onBeforeUnmount(clearPixelEffect)

const principles = [
  {
    title: 'Arquitetura & Escalabilidade',
    description:
      'Estruturo soluções pensando em crescimento, manutenção e evolução contínua do produto.',
    icon: 'mdi-layers-outline',
  },
  {
    title: 'Performance & Qualidade',
    description:
      'Busco código eficiente, consultas otimizadas e experiências rápidas e consistentes.',
    icon: 'mdi-speedometer',
  },
  {
    title: 'Segurança & Boas Práticas',
    description:
      'Aplico princípios de segurança, organização e padrões que tornam o software mais confiável.',
    icon: 'mdi-shield-check-outline',
  },
  {
    title: 'Experiência do Usuário',
    description:
      'Transformo requisitos em interfaces claras, acessíveis e focadas nas necessidades de quem utiliza o produto.',
    icon: 'mdi-account-heart-outline',
  },
  {
    title: 'Código Sustentável',
    description:
      'Prioritizo código legível, organizado e preparado para manutenção, testes e evolução do sistema.',
    icon: 'mdi-code-braces',
  },
  {
    title: 'Evolução Contínua',
    description:
      'Mantenho uma postura de aprendizado constante, acompanhando tecnologias e práticas que agregam valor.',
    icon: 'mdi-trending-up',
  },
]
</script>

<template>
  <section id="sobre" class="q-py-xl" aria-labelledby="about-title">
    <div class="wrapper">
      <div
        v-if="pending"
        class="row items-center justify-center q-py-xl"
        aria-live="polite"
        aria-busy="true"
      >
        <q-spinner color="primary" size="50px" aria-label="Carregando informações do perfil" />
      </div>

      <div v-else-if="error" class="row items-center justify-center q-py-xl" role="alert">
        <q-banner rounded class="bg-negative text-white">
          Não foi possível carregar os dados do portfólio.
        </q-banner>
      </div>

      <template v-else-if="portfolio">
        <!-- Apresentação principal -->
        <div class="row items-center q-col-gutter-xl">
          <div class="col-12 col-md-7">
            <h1
              id="about-title"
              class="text-weight-bold q-mb-md"
              :class="isMobile ? 'text-h4' : 'text-h2'"
            >
              {{ portfolio.profile.name }}
            </h1>

            <p
              class="text-primary text-weight-medium q-mb-lg"
              :class="isMobile ? 'text-h5' : 'text-h4'"
            >
              {{ portfolio.profile.headline }}
            </p>

            <p class="text-body1 q-mb-xl">
              {{ portfolio.profile.shortBio }}
            </p>

            <div class="about-sections row items-center q-gutter-sm">
              <q-btn-dropdown
                outline
                icon="mdi-file-document-outline"
                label="Meu currículo"
                no-caps
                aria-label="Abrir opções de currículo"
                :class="['about-actions__resume', isMobile ? 'full-width' : '']"
              >
                <q-list class="bg-primary text-white">
                  <q-item
                    clickable
                    v-close-popup
                    tag="a"
                    href="/documents/HudsonKennedy.pdf"
                    download="HudsonKennedy.pdf"
                    aria-label="Baixar currículo criativo em PDF"
                  >
                    <q-item-section avatar>
                      <q-icon name="mdi-lightbulb-on-outline" aria-hidden="true" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label> Currículo Criativo </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator dark />

                  <q-item
                    clickable
                    v-close-popup
                    tag="a"
                    href="/documents/HudsonKennedyAts.pdf"
                    download="HudsonKennedyAts.pdf"
                    aria-label="Baixar currículo ATS em PDF"
                  >
                    <q-item-section avatar>
                      <q-icon name="mdi-robot-outline" aria-hidden="true" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label> Currículo ATS </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>

              <social-links-fab direction="right" class="about-actions__social"/>
            </div>
          </div>

          <!-- Avatar com efeito elétrico -->
          <div class="col-12 col-md-5 flex flex-center">
            <div class="profile-avatar">
              <!-- Anel elétrico -->
              <div class="profile-avatar__electric" aria-hidden="true">
                <span class="electric-spark electric-spark--1"></span>
                <span class="electric-spark electric-spark--2"></span>
                <span class="electric-spark electric-spark--3"></span>
                <span class="electric-spark electric-spark--4"></span>
                <span class="electric-spark electric-spark--5"></span>
                <span class="electric-spark electric-spark--6"></span>
              </div>

              <div
                class="profile-avatar__image shadow-10"
                @mouseenter="drawPixelEffect"
                @mouseleave="clearPixelEffect"
              >
                <img
                  class="profile-avatar__image-base"
                  :src="profileImage"
                  :alt="`${portfolio.profile.name} - ${portfolio.profile.headline}`"
                  loading="eager"
                />

                <canvas ref="pixelCanvas" class="profile-avatar__pixelated" aria-hidden="true"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Sobre mim -->
        <div class="about-content q-mt-xl">
          <div class="about-text">
            <h2 class="text-weight-bold q-mb-lg" :class="isMobile ? 'text-h4' : 'text-h3'">
              <div class="text-overline text-primary" aria-hidden="true">Sobre mim</div>
              Experiência que gera resultado
            </h2>

            <p
              id="about-description"
              class="text-body1 about-description"
              :class="{ 'about-description--collapsed': isMobile && !isAboutExpanded }"
            >
              {{ portfolio.profile.about }}
            </p>

            <q-btn
              v-if="isMobile"
              flat
              color="primary"
              no-caps
              :label="isAboutExpanded ? 'Ler menos' : 'Ler mais'"
              :icon="isAboutExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              :aria-expanded="isAboutExpanded"
              aria-controls="about-description"
              @click="isAboutExpanded = !isAboutExpanded"
            />
          </div>
        </div>

        <div class="principles-section q-mt-xl">
          <!-- Desktop: grade 3 x 2 -->
          <div v-if="!isMobile" class="principles-grid q-mt-xl" aria-label="Princípios de trabalho">
            <q-card
              v-for="principle in principles"
              :key="principle.title"
              flat
              bordered
              class="principle-card"
              :class="isDark ? 'bg-transparent backdrop-blur' : 'bg-primary'"
            >
              <q-card-section class="principle-card__content">
                <q-avatar
                  color="white"
                  text-color="primary"
                  size="52px"
                  class="principle-card__icon"
                >
                  <q-icon :name="principle.icon" size="28px" aria-hidden="true" />
                </q-avatar>

                <div class="principle-card__text">
                  <h3 class="text-subtitle1 text-white text-weight-bold">
                    {{ principle.title }}
                  </h3>

                  <p class="text-body2 text-white q-mb-none text-center">
                    {{ principle.description }}
                  </p>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Mobile: carousel automático -->
          <div v-else class="principles-carousel q-mt-xl" aria-label="Princípios de trabalho">
            <q-carousel
              v-model="activePrinciple"
              animated
              infinite
              swipeable
              navigation
              control-color="primary"
              navigation-icon="mdi-circle-small"
              navigation-active-icon="mdi-circle"
              height="300px"
              :autoplay="5000"
              transition-prev="slide-right"
              transition-next="slide-left"
              class="principles-carousel__carousel bg-transparent"
            >
              <q-carousel-slide
                v-for="(principle, index) in principles"
                :key="principle.title"
                :name="String(index)"
                class="principle-slide"
              >
                <q-card flat bordered class="principle-card principle-card--mobile bg-primary">
                  <q-card-section class="principle-card__content">
                    <q-avatar
                      color="white"
                      text-color="primary"
                      size="52px"
                      class="principle-card__icon"
                    >
                      <q-icon :name="principle.icon" size="28px" aria-hidden="true" />
                    </q-avatar>

                    <div class="principle-card__text">
                      <h3 class="text-subtitle1 text-white text-weight-bold">
                        {{ principle.title }}
                      </h3>

                      <p class="text-body2 text-white q-mt-sm q-mb-none text-center">
                        {{ principle.description }}
                      </p>
                    </div>
                  </q-card-section>
                </q-card>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style>
/* =========================================================
   SOBRE MIM
   ========================================================= */

.about-content {
  width: 100%;
}

.about-text {
  max-width: 1000px;

  text-align: left;
}

.about-description {
  max-width: 1000px;
  margin: 0;
  line-height: 1.8;
}



/* =========================================================
   PRINCÍPIOS
   ========================================================= */

.principles-section {
  width: 100%;
}

.principles-heading {
  max-width: 800px;
  margin: 0 auto;
}

.principles-intro {
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.85;
  line-height: 1.7;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(2, 220px);
  gap: 18px;
}

.principle-card {
  height: 220px;
}

.principle-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.45);
  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.22),
    0 0 18px rgba(0, 212, 255, 0.12);
}

.principle-card__content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.principle-card__icon {
  flex-shrink: 0;
  margin-bottom: -5px;
}

.principle-card__text {
  width: 100%;
}

.principle-card__text h3 {
  min-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.principle-card__text p {
  min-height: 2px;
}

/* =========================================================
   CAROUSEL MOBILE
   ========================================================= */

.principles-carousel {
  width: 100%;
}

.principle-slide {
  padding: 8px 0 34px;
}

.principle-card--mobile {
  width: 100%;
  min-height: 205px;
}

.principle-card--mobile .principle-card__content {
  min-height: 205px;
  padding: 28px 24px;
}

/* =========================================================
   AVATAR / EFEITO ELÉTRICO
   ========================================================= */

.profile-avatar {
  --avatar-size: 280px;

  position: relative;
  width: var(--avatar-size);
  height: var(--avatar-size);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* =========================================================
   IMAGEM
   ========================================================= */

.profile-avatar__image {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
}

.profile-avatar__image-base {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.2s ease;
}

.profile-avatar__pixelated {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.profile-avatar__pixelated {
  display: block;
  width: 100%;
  height: 100%;
}

/* =========================================================
   CONTAINER DO EFEITO
   ========================================================= */

.profile-avatar__electric {
  position: absolute;
  inset: -18px;
  z-index: 2;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.9);
  pointer-events: none;

  transition:
    opacity 0.25s ease,
    transform 0.35s ease;
}

/* =========================================================
   ANEL ELÉTRICO PRINCIPAL
   ========================================================= */

.profile-avatar__electric::before {
  content: '';

  position: absolute;
  inset: 0;

  border-radius: 50%;

  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 12deg,
    rgba(0, 174, 239, 0.95) 16deg,
    rgba(0, 229, 255, 1) 22deg,
    transparent 29deg,
    transparent 55deg,
    rgba(0, 174, 239, 0.9) 62deg,
    rgba(0, 229, 255, 1) 69deg,
    transparent 77deg,
    transparent 118deg,
    rgba(0, 174, 239, 0.9) 126deg,
    rgba(0, 229, 255, 1) 133deg,
    transparent 141deg,
    transparent 190deg,
    rgba(0, 174, 239, 0.95) 198deg,
    rgba(0, 229, 255, 1) 206deg,
    transparent 214deg,
    transparent 255deg,
    rgba(0, 174, 239, 0.9) 264deg,
    rgba(0, 229, 255, 1) 271deg,
    transparent 280deg,
    transparent 320deg,
    rgba(0, 174, 239, 0.95) 328deg,
    rgba(0, 229, 255, 1) 335deg,
    transparent 344deg,
    transparent 360deg
  );

  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px));

  mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px));

  filter: drop-shadow(0 0 4px rgba(0, 229, 255, 0.95)) drop-shadow(0 0 10px rgba(0, 174, 239, 0.75))
    drop-shadow(0 0 18px rgba(0, 174, 239, 0.35));

  transform-origin: center center;

  animation: none;
}

/* =========================================================
   SEGUNDO ANEL
   ========================================================= */

.profile-avatar__electric::after {
  content: '';

  position: absolute;
  inset: 7px;

  border-radius: 50%;
  border: 1px solid rgba(0, 229, 255, 0.35);

  box-shadow:
    0 0 8px rgba(0, 229, 255, 0.5),
    inset 0 0 8px rgba(0, 229, 255, 0.25);

  animation: none;
}

/* =========================================================
   FAÍSCAS
   ========================================================= */

.electric-spark {
  position: absolute;

  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: #00e5ff;

  box-shadow:
    0 0 5px #00e5ff,
    0 0 12px rgba(0, 174, 239, 0.9),
    0 0 20px rgba(0, 174, 239, 0.55);

  opacity: 0;
  transform: scale(0);

  animation: none;
}

/* =========================================================
   POSIÇÕES DAS FAÍSCAS
   ========================================================= */

.electric-spark--1 {
  top: 5%;
  left: 25%;
  animation-delay: 0s;
}

.electric-spark--2 {
  top: 18%;
  right: 3%;
  animation-delay: 0.3s;
}

.electric-spark--3 {
  bottom: 20%;
  right: 0;
  animation-delay: 0.6s;
}

.electric-spark--4 {
  bottom: 4%;
  left: 30%;
  animation-delay: 0.9s;
}

.electric-spark--5 {
  bottom: 27%;
  left: 0;
  animation-delay: 1.2s;
}

.electric-spark--6 {
  top: 23%;
  left: 5%;
  animation-delay: 1.5s;
}

/* =========================================================
   HOVER
   ========================================================= */

.profile-avatar:hover .profile-avatar__electric {
  opacity: 1;
  transform: scale(1);
}

.profile-avatar:hover .profile-avatar__electric::before {
  animation: electric-rotate 4.5s linear infinite;
}

.profile-avatar:hover .profile-avatar__electric::after {
  animation: electric-pulse 1.4s ease-in-out infinite;
}

.profile-avatar:hover .profile-avatar__image {
  transform: scale(1.015);

  box-shadow:
    0 0 15px rgba(0, 174, 239, 0.45),
    0 0 35px rgba(0, 174, 239, 0.25);
}

.profile-avatar:hover .profile-avatar__image-base {
  opacity: 0.08;
}

.profile-avatar:hover .profile-avatar__pixelated {
  opacity: 1;
}

.profile-avatar:hover .electric-spark {
  opacity: 1;
  animation: electric-spark 1.8s ease-in-out infinite;
}

/* =========================================================
   ANIMAÇÕES
   ========================================================= */

@keyframes electric-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes electric-pulse {
  0%,
  100% {
    opacity: 0.35;
    transform: scale(0.98);
  }

  50% {
    opacity: 0.9;
    transform: scale(1.015);
  }
}

@keyframes electric-spark {
  0%,
  100% {
    opacity: 0;
    transform: scale(0);
  }

  20% {
    opacity: 1;
    transform: scale(1.3);
  }

  45% {
    opacity: 0.6;
    transform: scale(0.8);
  }

  70% {
    opacity: 0;
    transform: scale(0);
  }
}

/* =========================================================
   ACESSIBILIDADE
   ========================================================= */

@media (prefers-reduced-motion: reduce) {
  .profile-avatar__electric::before,
  .profile-avatar__electric::after,
  .electric-spark,
  .principle-card {
    animation: none;
    transition: none;
  }

  .profile-avatar:hover .profile-avatar__electric {
    opacity: 1;
  }
}

/*=============================================================
Mobile Styles
============================================================= */
@media (max-width: 768px) {
  .about-description--collapsed {
    display: -webkit-box;
    overflow: hidden;
    line-clamp: 5;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }

    .profile-avatar {
    --avatar-size: 205px;

    position: relative;
    width: var(--avatar-size);
    height: var(--avatar-size);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .about-actions {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .about-actions__social {
    order: 1;
    align-self: center;
  }

  .about-actions__resume {
    order: 2;
    width: 100%;
  }
}

</style>
