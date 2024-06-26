import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPriceData, setCoinList } from '../utils/reduxStorage';
import { spotPriceUrl, coinListUrl } from '../utils/urls';

const useSpotData = () => {
  const [tickSizeData, setTickSizeData] = useState(null);
  const dispatch = useDispatch();

  const countDecimalPlaces = (num) => {
    let reduced = parseFloat(num);
    if (parseFloat(num) >= 1) { return 0; }
    reduced = reduced.toString();
    if (reduced === "1e-7") { return 7; }
    if (reduced === "1e-8") { return 8; }
    return reduced.split(".")[1].length;
  };

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetch(spotPriceUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
    
        const filteredCoins = jsonData.filter(coin => {
          return (coin.symbol.endsWith('USDT') || coin.symbol === 'USDTTRY') && coin.bidPrice !== '0.00000000';
        });
    
        const priceList = filteredCoins.map(coin => {
          let symbol = coin.symbol;
          let price = coin.lastPrice;
          let volume = parseFloat(coin.quoteVolume).toFixed(2);
          const change = parseFloat(coin.priceChangePercent).toFixed(2);
          let currency = '$';

          if (symbol !== "USDTTRY") {
            symbol = symbol.slice(0, -"USDT".length);
          } else {
            symbol = symbol.slice(0, -"TRY".length);
            volume = parseFloat(coin.volume).toFixed(2);
            currency = '₺';
          }

          if (tickSizeData) {
            let tickData = tickSizeData.find(coin => coin.symbol === symbol);
            if (tickData) {
              const tickSizeDecimals = tickData.tickSize;
              price = parseFloat(price).toFixed(tickSizeDecimals);
            }
          } else {
            price = parseFloat(price);
          }
    
          return {
            symbol: symbol,
            price: price,
            volume: volume,
            change: change,
            currency: currency
          };
        });
        dispatch(setPriceData(priceList));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPriceData();
    const intervalId = setInterval(fetchPriceData, 5000);
    return () => clearInterval(intervalId);
    
  }, [tickSizeData, dispatch]);

  useEffect(() => {
    const fetchListAndTickSizeData = async () => {
      try {
        const response = await fetch(coinListUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
    
        const filteredCoins = jsonData.symbols.filter(coin => {
          return (coin.symbol.endsWith('USDT') || coin.symbol === 'USDTTRY') && coin.status !== 'BREAK';
        });
    
        const tickSizeList = filteredCoins.map(item => {
          let symbol = item.symbol;
          let tickSize = countDecimalPlaces(item.filters[0].tickSize);
          if (symbol !== "USDTTRY") {
            symbol = symbol.slice(0, -"USDT".length);
          } else {
            symbol = symbol.slice(0, -"TRY".length);
          }
          return {
            symbol: symbol,
            tickSize: tickSize
          };
        });

        const coinSymbolList = filteredCoins.map(item => {
          let symbol = item.symbol;
          if (symbol !== "USDTTRY") {
            symbol = symbol.slice(0, -"USDT".length);
          } else {
            symbol = symbol.slice(0, -"TRY".length);
          }
          return symbol;
        }).slice().sort((a, b) => { return a.localeCompare(b) });
        setTickSizeData(tickSizeList);
        dispatch(setCoinList(coinSymbolList));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchListAndTickSizeData();
  }, [dispatch]);
};

export default useSpotData;