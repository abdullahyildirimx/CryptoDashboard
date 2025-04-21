import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFuturesCoinData, setFuturesCoinList } from '../utils/reduxStorage';
import { futuresPriceUrl, futuresExchangeInfoUrl, coinLogosUrl, getLogoLink } from '../utils/urls';

const useFuturesData = () => {
  const [coinMetadata, setCoinMetadata] = useState(null);
  const [activeSymbols, setActiveSymbols] = useState(null);
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
        const response = await fetch(futuresPriceUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
    
        let filteredCoins = jsonData.filter(coin => {
          return coin.symbol.endsWith('USDT');
        });

        if (activeSymbols) {
          filteredCoins = filteredCoins.filter(coin => {
            return activeSymbols.includes(coin.symbol);
          });
        }
    
        const priceList = filteredCoins.map(coin => {
          let symbol = coin.symbol;
          let price = coin.lastPrice;
          const volume = parseFloat(coin.quoteVolume).toFixed(2);
          const change = parseFloat(coin.priceChangePercent).toFixed(2);
          const currency = '$';
          let logo = null;
          let tickSize = null;

          symbol = symbol.slice(0, -"USDT".length);

          if (coinMetadata) {
            let metadata = coinMetadata.find(coin => coin.symbol === symbol);
            if (metadata) {
              const tickSizeDecimals = metadata.tickSize;
              price = parseFloat(price).toFixed(tickSizeDecimals);
              logo = metadata.logo;
              tickSize = metadata.tickSize;
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
            logo: logo,
            tickSize: tickSize
          };
        });
        dispatch(setFuturesCoinData(priceList));
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
        const response = await fetch(futuresExchangeInfoUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        const response2 = await fetch(coinLogosUrl);
        if (!response2.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData2 = await response2.json();
        const logoData = jsonData2.data;

        const filteredCoins = jsonData.symbols.filter(coin => {
          return coin.symbol.endsWith('USDT') && coin.status === 'TRADING';
        });

        const coinMetadata = filteredCoins.map(item => {
          let symbol = item.symbol;
          let tickSize = countDecimalPlaces(item.filters[0].tickSize);
          let logoNumber = 1;
          let logo = null;
          symbol = symbol.slice(0, -"USDT".length);

          logoNumber = logoData.find(coin => coin.name === symbol)?.cmcUniqueId;
          logo = logoNumber && getLogoLink(logoNumber);
          return {
            symbol: symbol,
            tickSize: tickSize,
            logo: logo
          };
        }).slice().sort((a, b) => { return (a.symbol).localeCompare(b.symbol) });

        const coinFullSymbols = filteredCoins.map(item => {
          let symbol = item.symbol;
          return symbol;
        }).slice().sort();

        const coinSymbolList = coinMetadata.map(item => {
          let symbol = item.symbol;
          return symbol;
        });
        
        setCoinMetadata(coinMetadata);
        setActiveSymbols(coinFullSymbols);
        dispatch(setFuturesCoinList(coinSymbolList));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchCoinMetadata();
  }, [dispatch]);
};

export default useFuturesData;