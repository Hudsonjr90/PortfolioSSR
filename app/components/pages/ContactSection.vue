<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import type {
  GeoJSON as LeafletGeoJSON,
  Map as LeafletMap,
} from 'leaflet'

import 'leaflet/dist/leaflet.css'

import {
  getSocialDisplayValue,
  getSocialIcon,
  getSocialLabel,
} from '~/utils/global'

const { data: portfolio } = usePortfolio()

const config = useRuntimeConfig()

const mapContainer = ref<HTMLElement | null>(null)

const isMapLoading = ref(true)
const mapError = ref(false)

let map: LeafletMap | null = null
let neighborhoodLayer: LeafletGeoJSON | null = null

const email = computed(() => {
  return portfolio.value?.profile?.email ?? ''
})

const socialLinks = computed(() => {
  return [...(portfolio.value?.socialLinks ?? [])]
    .filter((social) => {
      const platform = social.platform
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()

      return platform !== 'email'
    })
    .sort(
      (a, b) =>
        (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
    )
})

const locationLabel = 'Rio de Janeiro, RJ, Brasil'

const locationCoordinates = {
  lat: -22.872288,
  lng: -43.526805,
  zoom: 13,
  neighborhood: 'Santíssimo',
}

const neighborhoodApiUrl = '/api/neighborhoods'

function createLocationIcon(L: typeof import('leaflet')) {
  return L.divIcon({
    className: 'custom-location-marker',
    html: `
      <div class="location-pin">
        <div class="location-pin-inner"></div>
      </div>
    `,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -38],
  })
}

function getNeighborhoodName(
  feature: {
    properties?: Record<string, unknown> | null
  },
) {
  return String(
    feature.properties?.nome ?? '',
  ).trim()
}

function normalizeNeighborhoodName(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function getNeighborhoodStyle(
  feature: {
    properties?: Record<string, unknown> | null
  },
) {
  const name = normalizeNeighborhoodName(
    getNeighborhoodName(feature),
  )

  const isSelected =
    name ===
    normalizeNeighborhoodName(
      locationCoordinates.neighborhood,
    )

  if (isSelected) {
    return {
      color: '#00D4FF',
      weight: 2.5,
      opacity: 1,
      fillColor: '#00D4FF',
      fillOpacity: 0.12,
    }
  }

  return {
    color: '#38BDF8',
    weight: 1,
    opacity: 0.45,
    fillColor: '#00D4FF',
    fillOpacity: 0.015,
  }
}

function onNeighborhoodEachFeature(
  feature: {
    properties?: Record<string, unknown> | null
  },
  layer: import('leaflet').Layer,
) {
  const neighborhoodName =
    getNeighborhoodName(feature)

  if (!neighborhoodName) {
    return
  }

  const normalizedName =
    normalizeNeighborhoodName(
      neighborhoodName,
    )

  const selectedName =
    normalizeNeighborhoodName(
      locationCoordinates.neighborhood,
    )

  if (
    normalizedName === selectedName &&
    'bindTooltip' in layer
  ) {
    ;(
      layer as import('leaflet').Path
    ).bindTooltip(
      `<strong>${neighborhoodName}</strong>`,
      {
        permanent: true,
        direction: 'center',
        className:
          'neighborhood-label neighborhood-label-active',
      },
    )
  }
}

async function loadNeighborhoods(
  L: typeof import('leaflet'),
) {
  try {
    const data = await $fetch<{
      type: 'FeatureCollection'
      features: Array<{
        type: 'Feature'
        properties?: Record<string, unknown>
        geometry: unknown
      }>
    }>(neighborhoodApiUrl)

    neighborhoodLayer = L.geoJSON(data as any, {
      style: (feature) => {
        return getNeighborhoodStyle(
          feature as {
            properties?: Record<string, unknown> | null
          },
        )
      },

      onEachFeature: (
        feature,
        layer,
      ) => {
        onNeighborhoodEachFeature(
          feature as {
            properties?: Record<string, unknown> | null
          },
          layer,
        )

        layer.on({
          mouseover: () => {
            const neighborhoodName =
              getNeighborhoodName(
                feature as {
                  properties?: Record<string, unknown> | null
                },
              )

            const isSelected =
              normalizeNeighborhoodName(
                neighborhoodName,
              ) ===
              normalizeNeighborhoodName(
                locationCoordinates.neighborhood,
              )

            if (
              !isSelected &&
              'setStyle' in layer
            ) {
              ;(
                layer as import('leaflet').Path
              ).setStyle({
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.05,
              })
            }
          },

          mouseout: () => {
            if ('setStyle' in layer) {
              ;(
                layer as import('leaflet').Path
              ).setStyle(
                getNeighborhoodStyle(
                  feature as {
                    properties?: Record<string, unknown> | null
                  },
                ),
              )
            }
          },
        })
      },
    }).addTo(map!)

    neighborhoodLayer.bringToBack()
  } catch (error) {
    console.error(
      'Erro ao carregar os limites dos bairros:',
      error,
    )
  }
}

async function initializeMap() {
  await nextTick()

  if (!mapContainer.value) {
    isMapLoading.value = false
    return
  }

  try {
    const L = await import('leaflet')

    const apiKey = String(
      config.public.cartoApiKey ?? '',
    ).trim()

    console.log(
      'CARTO API KEY:',
      apiKey
        ? `configurada (${apiKey.length} caracteres)`
        : 'NÃO CONFIGURADA',
    )

    if (!apiKey) {
      console.warn(
        'CARTO API key não configurada.',
      )

      mapError.value = true
      isMapLoading.value = false

      return
    }

    map = L.map(mapContainer.value, {
      center: [
        locationCoordinates.lat,
        locationCoordinates.lng,
      ],
      zoom: locationCoordinates.zoom,
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
    })

    L.tileLayer(
      `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png?key=${encodeURIComponent(apiKey)}`,
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      },
    ).addTo(map)

    await loadNeighborhoods(L)

    const locationMarker = L.marker(
      [
        locationCoordinates.lat,
        locationCoordinates.lng,
      ],
      {
        icon: createLocationIcon(L),
        title: 'Hudson Kennedy',
        alt: 'Localização de Hudson Kennedy',
      },
    ).addTo(map)

    locationMarker
      .bindPopup(
        `
          <div class="location-popup">
            <strong>Hudson Kennedy</strong>
            <span>Santíssimo · Rio de Janeiro, RJ</span>
          </div>
        `,
        {
          closeButton: true,
          autoClose: false,
          closeOnClick: false,
        },
      )
      .openPopup()

    isMapLoading.value = false

    setTimeout(() => {
      map?.invalidateSize()
    }, 300)
  } catch (error) {
    console.error(
      'Erro ao inicializar o mapa:',
      error,
    )

    mapError.value = true
    isMapLoading.value = false

    map?.remove()
    map = null
  }
}

onMounted(() => {
  initializeMap()
})

onBeforeUnmount(() => {
  neighborhoodLayer = null

  map?.remove()
  map = null
})
</script>

<template>
  <section
    id="contato"
    class="q-py-xl"
  >
    <div class="wrapper">
      <!-- Cabeçalho -->
      <div class="contact-heading q-mb-xl">
        <div
          class="text-overline text-primary text-weight-bold"
        >
          Contato
        </div>

        <div class="text-h3 text-weight-bold">
          Vamos conversar?
        </div>

        <div class="text-body1 q-mt-md">
          Estou aberto a novas oportunidades,
          projetos e conexões profissionais.
          Se você tem uma ideia ou oportunidade
          que possa fazer sentido, entre em
          contato.
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="row q-col-gutter-lg">
        <!-- Canais -->
        <div class="col-12 col-md-5">
          <q-card
            flat
            bordered
            class="contact-card full-height bg-transparent"
          >
            <q-card-section class="q-pa-lg">
              <div class="text-h6 text-weight-bold">
                Canais
              </div>

              <div class="contact-list q-mt-lg">
                <a
                  v-if="email"
                  :href="`mailto:${email}`"
                  class="contact-info"
                >
                  <q-avatar
                    color="primary"
                    size="44px"
                  >
                    <q-icon name="mdi-email-outline" />
                  </q-avatar>

                  <div class="contact-info-content">
                    <div class="text-caption">
                      E-mail
                    </div>

                    <div
                      class="text-body2 text-weight-bold"
                    >
                      {{ email }}
                    </div>
                  </div>
                </a>

                <a
                  v-for="social in socialLinks"
                  :key="social.id"
                  :href="social.url"
                  class="contact-info"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <q-avatar
                    color="primary"
                    size="44px"
                  >
                    <q-icon
                      :name="
                        getSocialIcon(
                          social.platform,
                          social.icon,
                        )
                      "
                    />
                  </q-avatar>

                  <div class="contact-info-content">
                    <div class="text-caption">
                      {{
                        getSocialLabel(
                          social.platform,
                          social.label,
                        )
                      }}
                    </div>

                    <div
                      class="text-body2 text-weight-bold"
                    >
                      {{
                        getSocialDisplayValue(
                          social.platform,
                          social.url,
                        )
                      }}
                    </div>
                  </div>
                </a>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Localização -->
        <div class="col-12 col-md-7">
          <q-card
            flat
            bordered
            class="contact-map-card full-height bg-transparent"
          >
            <q-card-section
              class="q-pa-lg q-pb-md"
            >
              <div class="text-h6 text-weight-bold">
                Localização
              </div>

              <div class="contact-location q-mt-md">
                <q-icon
                  name="mdi-map-marker-outline"
                  color="primary"
                  size="26px"
                />

                <span
                  class="text-body1 text-weight-bold"
                >
                  {{ locationLabel }}
                </span>
              </div>
            </q-card-section>

            <div
              ref="mapContainer"
              class="contact-map"
            >
              <div
                v-if="isMapLoading"
                class="map-state"
              >
                <q-spinner
                  color="primary"
                  size="36px"
                />

                <div class="text-body2 q-mt-sm">
                  Carregando mapa...
                </div>
              </div>

              <div
                v-if="
                  mapError &&
                  !isMapLoading
                "
                class="map-state"
              >
                <q-icon
                  name="mdi-map-outline"
                  size="40px"
                  color="primary"
                />

                <div class="text-body2 q-mt-sm">
                  Não foi possível carregar o mapa.
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-heading {
  max-width: 850px;
}

.contact-card,
.contact-map-card {
  overflow: hidden;
  border-radius: 16px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  color: inherit;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.contact-info:hover {
  opacity: 0.75;
}

.contact-info-content {
  min-width: 0;
}

.contact-info-content .text-body2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact-location {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-map {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.contact-map :deep(.leaflet-container) {
  width: 100%;
  height: 100%;
  background: #070b14;
  font-family: inherit;
}

.contact-map :deep(.leaflet-control-zoom) {
  border: 0;
  box-shadow: none;
}

.contact-map :deep(.leaflet-control-zoom a) {
  width: 34px;
  height: 34px;
  line-height: 34px;
  background: #ffffff;
  color: #111827;
  border: 0;
}

.contact-map :deep(.leaflet-control-zoom a:hover) {
  background: #f1f5f9;
}

.contact-map :deep(.leaflet-popup-content-wrapper),
.contact-map :deep(.leaflet-popup-tip) {
  background: #ffffff;
}

.contact-map :deep(.leaflet-popup-content) {
  margin: 12px 16px;
}

.contact-map :deep(.location-popup) {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-map :deep(.location-popup strong) {
  font-size: 14px;
}

.contact-map :deep(.location-popup span) {
  font-size: 12px;
  color: #64748b;
}

.contact-map :deep(.neighborhood-label) {
  background: rgba(7, 11, 20, 0.88);
  border: 1px solid rgba(56, 189, 248, 0.65);
  border-radius: 6px;
  box-shadow: none;
  color: #e2e8f0;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 7px;
}

.contact-map :deep(.neighborhood-label::before) {
  display: none;
}

.contact-map :deep(.neighborhood-label-active) {
  background: rgba(0, 212, 255, 0.9);
  border-color: #ffffff;
  color: #070b14;
}

.contact-map :deep(.leaflet-control-attribution) {
  font-size: 10px;
}

.contact-map :deep(.custom-location-marker) {
  background: transparent;
  border: 0;
}

.contact-map :deep(.location-pin) {
  position: relative;
  width: 32px;
  height: 42px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.contact-map :deep(.location-pin::before) {
  content: '';
  position: absolute;
  top: 1px;
  left: 4px;
  width: 24px;
  height: 24px;
  background: #00d4ff;
  border: 3px solid #ffffff;
  border-radius: 50% 50% 50% 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
  transform: rotate(-45deg);
}

.contact-map :deep(.location-pin-inner) {
  position: absolute;
  top: 8px;
  left: 11px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffffff;
  z-index: 2;
}

.map-state {
  position: absolute;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  background: #070b14;
}

@media (max-width: 599px) {
  .contact-map {
    height: 260px;
  }
}
</style>