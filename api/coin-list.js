import fetch from 'node-fetch';

const countDecimalPlaces = (num) => {
  let reduced = parseFloat(num);
  if (parseFloat(num) >= 1) { return 0; }
  reduced = reduced.toString();
  if (reduced === "1e-7") { return 7; }
  if (reduced === "1e-8") { return 8; }
  return reduced.split(".")[1].length;
};

export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const jsonData = await response.json();

    const filteredCoins = jsonData.symbols.filter(coin => {
      return (coin.symbol.endsWith('USDT') || coin.symbol === 'USDTTRY') && coin.status !== 'BREAK';
    });

    const coinList = filteredCoins.map(item => {
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
    }).slice().sort((a, b) => { return a.symbol.localeCompare(b.symbol) });
    res.status(200).json(coinList);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}