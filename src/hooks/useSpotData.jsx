import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceData, setCoinList, setLoading } from '../reducers/SpotDataSlice';

const useSpotData = () => {
  const [tickSizeData, setTickSizeData] = useState(null);
  const dispatch = useDispatch();
  const { priceData, coinList, loading } = useSelector((state) => state.spotData);

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
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
    
        const filteredCoins = jsonData.filter(coin => {
          return (coin.symbol.endsWith('USDT') || coin.symbol === 'USDTTRY') && coin.bidPrice !== '0.00000000';
        });
    
        const priceList = filteredCoins.map(coin => {
          let symbol = coin.symbol;
          let currency = '$';
          if (symbol !== "USDTTRY") {
            symbol = symbol.slice(0, -"USDT".length);
          } else {
            symbol = symbol.slice(0, -"TRY".length);
            currency = '₺';
          }
    
          let price = coin.lastPrice;
          if (tickSizeData) {
            let tickData = tickSizeData.find(coin => coin.symbol === symbol);
            if (tickData) {
              const tickSizeDecimals = tickData.tickSize;
              price = parseFloat(price).toFixed(tickSizeDecimals);
            }
          } else {
            price = parseFloat(price);
          }
    
          const change = parseFloat(coin.priceChangePercent).toFixed(2);
    
          return {
            symbol: symbol,
            price: price,
            change: change,
            currency: currency
          };
        });
    
        dispatch(setPriceData(priceList));

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();
    const intervalId = setInterval(fetchPriceData, 5000);
    return () => clearInterval(intervalId);
    
  }, [tickSizeData, dispatch]);

  useEffect(() => {
    const fetchListAndTickSizeData = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
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

  return { priceData, coinList, loading };
};

export default useSpotData;