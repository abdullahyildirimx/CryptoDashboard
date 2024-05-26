import { useEffect } from 'react'
import { useSelector } from 'react-redux';
const useDocumentTitle = () => {
  const { priceData } = useSelector((state) => state.spotData);

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