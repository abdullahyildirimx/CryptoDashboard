import { useEffect } from 'react'
import useSpotData from './useSpotData'

const useDocumentTitle = () => {
  const { priceData, tickSizeData } = useSpotData();

  useEffect(() => {
    const findPriceData = (symbol) => {
      return priceData && priceData.find(item => item.symbol === symbol);
    };

    const findTickSizeData = (symbol) => {
      return tickSizeData && tickSizeData.find(item => item.symbol === symbol);
    };

    const getPriceWithTickSize = (symbol, price) => {
      let tickSizeDecimals = 8;
      if (tickSizeData) {
        const data = findTickSizeData(symbol);
        if (data) {
          tickSizeDecimals = data.tickSize;
        }
        return parseFloat(price).toFixed(tickSizeDecimals);
      } 
    };

    const btcPriceUsd = priceData && tickSizeData && getPriceWithTickSize("BTCUSDT", findPriceData("BTCUSDT").lastPrice);
    const title =
      btcPriceUsd
        ? `Dashboard - $${btcPriceUsd}`
        : 'Crypto Dashboard';

    document.title = `${title}`;
  }, [priceData, tickSizeData]);
}

export default useDocumentTitle;