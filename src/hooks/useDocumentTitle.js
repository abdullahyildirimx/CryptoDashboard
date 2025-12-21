import { useEffect } from 'react'
import { useSelector } from 'react-redux'
const useDocumentTitle = () => {
  const { spotCoinData, futuresCoinData } = useSelector(
    (state) => state.dataStore,
  )

  useEffect(() => {
    const isSpot = location.pathname === '/'
    const btcPriceUsd = isSpot
      ? spotCoinData?.find((item) => item.symbol === 'BTC').price
      : futuresCoinData?.find((item) => item.symbol === 'BTC').price
    const title = btcPriceUsd
      ? `$${btcPriceUsd} | BTC | CryptoPrices`
      : 'CryptoPrices'

    document.title = `${title}`
  }, [spotCoinData, futuresCoinData])
}

export default useDocumentTitle
