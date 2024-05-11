import { useState, useEffect } from 'react';

const useSpotData = () => {
  const [priceData, setPriceData] = useState(null);
  const [tickSizeData, setTickSizeData] = useState(null);
  const [loading, setLoading] = useState(true);

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

        const filtered = jsonData.filter(item => {
          return (item.symbol.endsWith('USDT') || item.symbol === 'USDTTRY') && item.bidPrice !== '0.00000000';
        });

        setPriceData(filtered);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();

    const intervalId = setInterval(fetchPriceData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchTickSizeData = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        const filtered = jsonData.symbols.filter(item => {
          return (item.symbol.endsWith('USDT') || item.symbol === 'USDTTRY') && item.status !== 'BREAK';
        });

        const filteredTickSizes = filtered && filtered.map(item => ({
          symbol: item.symbol,
          tickSize: countDecimalPlaces(item.filters[0].tickSize)
        }));

        setTickSizeData(filteredTickSizes);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickSizeData();
  }, []);

  return { priceData, tickSizeData, loading };
};

export default useSpotData;