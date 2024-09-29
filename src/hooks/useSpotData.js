import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCoinData, setCoinList } from '../utils/reduxStorage';
import { spotPriceUrl, coinListUrl, coinLogosUrl, getLogoLink } from '../utils/urls';

const useSpotData = () => {
  const [coinMetadata, setCoinMetadata] = useState(null);
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
          let logo = '';

          if (symbol !== "USDTTRY") {
            symbol = symbol.slice(0, -"USDT".length);
          } else {
            symbol = symbol.slice(0, -"TRY".length);
            volume = parseFloat(coin.volume).toFixed(2);
            currency = '₺';
          }

          if (coinMetadata) {
            let metadata = coinMetadata.find(coin => coin.symbol === symbol);
            if (metadata) {
              const tickSizeDecimals = metadata.tickSize;
              price = parseFloat(price).toFixed(tickSizeDecimals);
              logo = metadata.logo;
            }
          } else {
            price = parseFloat(price);
          }
    
          return {
            symbol: symbol,
            price: price,
            volume: volume,
            change: change,
            currency: currency,
            logo: logo
          };
        });
        dispatch(setCoinData(priceList));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPriceData();
    const intervalId = setInterval(fetchPriceData, 5000);
    return () => clearInterval(intervalId);
    
  }, [coinMetadata, dispatch]);

  useEffect(() => {
    const fetchCoinMetadata = async () => {
      try {
        const response = await fetch(coinListUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        const response2 = await fetch(coinLogosUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData2 = await response2.json();
        const logoData = jsonData2.data;

        const filteredCoins = jsonData.symbols.filter(coin => {
          return (coin.symbol.endsWith('USDT') || coin.symbol === 'USDTTRY') && coin.status !== 'BREAK';
        });
        const coinMetadata = filteredCoins.map(item => {
          let symbol = item.symbol;
          let tickSize = countDecimalPlaces(item.filters[0].tickSize);
          let logoNumber = 1;
          let logo = '';

          if (symbol !== "USDTTRY") {
            symbol = symbol.slice(0, -"USDT".length);
          } else {
            symbol = symbol.slice(0, -"TRY".length);
          }

          if (symbol !== "EUR") {
            logoNumber = logoData.find(coin => coin.name === symbol).cmcUniqueId;
          } else {
            logoNumber = 2989;
          }
          logo = getLogoLink(logoNumber);

          return {
            symbol: symbol,
            tickSize: tickSize,
            logo: logo
          };
        }).slice().sort((a, b) => { return (a.symbol).localeCompare(b.symbol) });

        const coinSymbolList = coinMetadata.map(item => {
          let symbol = item.symbol;
          return symbol;
        });
        
        setCoinMetadata(coinMetadata);
        dispatch(setCoinList(coinSymbolList));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchCoinMetadata();
  }, [dispatch]);
};

export default useSpotData;