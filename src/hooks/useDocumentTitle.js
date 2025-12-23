import { useEffect } from 'react'
import { useSelector } from 'react-redux'
const useDocumentTitle = () => {
  const { spotCoinData, futuresCoinData } = useSelector(
    (state) => state.dataStore,
  )

  useEffect(() => {
    const isSpot = location.pathname === '/'
    const btcPriceUsd = isSpot
      ? Number(
          spotCoinData?.find((item) => item.symbol === 'BTC')?.price,
        ).toLocaleString('en-US', {
          minimumFractionDigits: 2,
        })
      : Number(
          futuresCoinData?.find((item) => item.symbol === 'BTC')?.price,
        ).toLocaleString('en-US', {
          minimumFractionDigits: 2,
        })
    const title = btcPriceUsd ? `${btcPriceUsd} | CryptoPrices` : 'CryptoPrices'

    document.title = `${title}`
  }, [spotCoinData, futuresCoinData])
}

export default useDocumentTitle
