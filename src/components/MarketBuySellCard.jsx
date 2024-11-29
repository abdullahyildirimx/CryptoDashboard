import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CryptoJS from "crypto-js";
import SettingsModal from './SettingsModal';

const MarketBuySellCard = () => {
  const { apiKey, apiSecret, coinList } = useSelector((state) => state.dataStore);
  const [balances, setBalances] = useState(null);

  // Fetch balances from Binance API
  const fetchBalances = async () => {
    console.log("fetching")
    const baseUrl = "https://api.binance.com";
    const endpoint = "/api/v3/account";
    const timestamp = Date.now();
  
    const queryString = `timestamp=${timestamp}`;
    const signature = CryptoJS.HmacSHA256(queryString, apiSecret).toString();
  
    const url = `${baseUrl}${endpoint}?${queryString}&signature=${signature}`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-MBX-APIKEY": apiKey,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (data.balances) {
        const filteredBalances = data.balances.filter(balance => parseFloat(balance.free) > 0 || parseFloat(balance.locked) > 0);
        setBalances(filteredBalances);
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setBalances(null);
    }

    // Filter out balances where free or locked amount is 0 or less

  };

  useEffect(() => {
    fetchBalances();
  }, [apiKey, apiSecret]);

  const handleClick = () => {
    fetchBalances();
    console.log('Button was clicked!');
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title mb-3">Market Buy/Sell</h5>
          <SettingsModal />
        </div>
        <div>
          {balances ? (
            <ul>
              {balances.map((balance, index) => (
                <li key={index}>
                  {balance.asset}: Free: {balance.free}, Locked: {balance.locked}
                </li>
              ))}
            </ul>
          ) : (
            <p>No balances to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketBuySellCard;