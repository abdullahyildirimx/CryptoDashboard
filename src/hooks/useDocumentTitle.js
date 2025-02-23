import { useEffect } from 'react'
import { useSelector } from 'react-redux';
const useDocumentTitle = () => {
  const { coinData } = useSelector((state) => state.dataStore);

  useEffect(() => {

    const btcPriceUsd = coinData?.find(item => item.symbol === "BTC").price;
    const title =
      btcPriceUsd
        ? `Dashboard - $${btcPriceUsd}`
        : 'Crypto Dashboard';

    document.title = `${title}`;
  }, [coinData]);
}

export default useDocumentTitle;