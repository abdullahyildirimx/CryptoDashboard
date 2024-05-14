import { useEffect } from 'react'
import useSpotData from './useSpotData';
const useDocumentTitle = () => {
  const { priceData } = useSpotData();

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