import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const jsonData = await response.json();

    const filteredCoins = jsonData.filter(coin => {
      return (coin.symbol.endsWith('USDT') || coin.symbol === 'USDTTRY') && coin.bidPrice !== '0.00000000';
    });

    const priceList = filteredCoins.map(coin => {
      let symbol = coin.symbol;
      const price = parseFloat(coin.lastPrice);
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

      return {
        symbol: symbol,
        price: price,
        volume: volume,
        change: change,
        currency: currency
      };
    });

    console.log(priceList); // Logging the output for debugging
    res.status(200).json(priceList);
  } catch (error) {
    console.error('Error fetching data:', error.message); // Logging error message
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}