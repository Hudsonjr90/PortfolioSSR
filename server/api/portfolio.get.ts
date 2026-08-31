import { createError, defineEventHandler } from 'h3'

import { getPortfolio } from '../services/portfolio.service'

export default defineEventHandler(async () => {
  const portfolio = await getPortfolio()

  if (!portfolio) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Portfolio profile not found',
    })
  }

  return portfolio
})