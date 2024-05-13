import { useEffect } from 'react'

const useDocumentTitle = (priceData) => {

  useEffect(() => {

    const btcPriceUsd = priceData && priceData.find(item => item.symbol === "BTC").price;
    const title =
      btcPriceUsd
        ? `Dashboard - $${btcPriceUsd}`
        : 'Crypto Dashboard';

    document.title = `${title}`;
  }, [priceData]);
}

export default useDocumentTitle;