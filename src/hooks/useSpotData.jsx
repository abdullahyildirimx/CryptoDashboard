import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPriceData, setCoinList, setLoading } from '../utils/reduxStorage';

const useSpotData = () => {
  const [tickSizeData, setTickSizeData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetch('/api/spot-data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
    
        const priceList = jsonData.map(coin => {
          const symbol = coin.symbol;
          let price = coin.price;
          const volume = coin.volume;
          const change = coin.change;
          const currency = coin.currency;

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
        const response = await fetch('/api/coin-list');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
    
        const coinSymbolList = jsonData.map(item => {
          const symbol = item.symbol;
          return symbol;
        });
        setTickSizeData(jsonData);
        dispatch(setCoinList(coinSymbolList));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchListAndTickSizeData();
  }, [dispatch]);
};

export default useSpotData;