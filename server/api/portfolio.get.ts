import { findPortfolio } from '../repositories/portfolio.repository'
import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async () => {
  const portfolio = await findPortfolio()

  if (!portfolio) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Portfolio profile not found',
    })
  }

  return portfolio
})