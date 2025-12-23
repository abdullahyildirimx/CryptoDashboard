import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const formatPrice = (value) => {
  const num = Number(value)
  if (!Number.isFinite(num)) return null

  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
  })
}

const useDocumentTitle = () => {
  const { spotCoinData, futuresCoinData } = useSelector(
    (state) => state.dataStore,
  )

  useEffect(() => {
    const isSpot = location.pathname === '/'
    const btcPriceUsd = isSpot
      ? formatPrice(spotCoinData?.find((item) => item.symbol === 'BTC')?.price)
      : formatPrice(
          futuresCoinData?.find((item) => item.symbol === 'BTC')?.price,
        )

    document.title = btcPriceUsd
      ? `${btcPriceUsd} | CryptoPrices`
      : 'CryptoPrices'
  }, [spotCoinData, futuresCoinData])
}

export default useDocumentTitle
