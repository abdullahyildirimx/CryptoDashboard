import { useEffect } from 'react'
import { useSelector } from 'react-redux'
const useDocumentTitle = () => {
  const { spotCoinData, futuresCoinData } = useSelector(
    (state) => state.dataStore,
  )

  useEffect(() => {
    const isSpot = location.pathname === '/spot'
    const btcPriceUsd = isSpot
      ? spotCoinData?.find((item) => item.symbol === 'BTC').price
      : futuresCoinData?.find((item) => item.symbol === 'BTC').price
    const title = btcPriceUsd
      ? `Dashboard - $${btcPriceUsd}`
      : 'Crypto Dashboard'

    document.title = `${title}`
  }, [spotCoinData, futuresCoinData])
}

export default useDocumentTitle
