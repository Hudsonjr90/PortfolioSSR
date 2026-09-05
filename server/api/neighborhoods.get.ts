import { defineEventHandler } from 'h3'

const ARCGIS_URL =
  'https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Cartografia/Limites_administrativos/FeatureServer/4/query'

export default defineEventHandler(async () => {
  const data = await $fetch(ARCGIS_URL, {
    query: {
      where: '1=1',
      outFields: 'nome,regiao_adm',
      returnGeometry: true,
      outSR: 4326,
      f: 'geojson',
      orderByFields: 'nome ASC',
    },
  })

  return data
})