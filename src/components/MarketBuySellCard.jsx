import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CryptoJS from "crypto-js";
import SearchDropdown from './SearchDropdown';
import { useIsMobile } from '../hooks/useScreenSize';
import { balancesUrl, orderUrl } from '../utils/urls';
import { getMarketBuySellStorage, setMarketBuySellStorage } from '../utils/localStorageUtils';

const MarketBuySellCard = () => {
  const { apiEnabled, apiKey, apiSecret, coinData, coinList } = useSelector((state) => state.dataStore);
  const localStorageData = getMarketBuySellStorage();
  const [balances, setBalances] = useState(null);
  const [buySliderValue, setBuySliderValue] = useState(0);
  const [sellSliderValue, setSellSliderValue] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState(localStorageData?.lastBaseCurrency || "BTC");
  const [quoteCurrency, setQuoteCurrency] = useState(localStorageData?.lastQuoteCurrency || "USDT");
  const [baseBalance, setBaseBalance] = useState(0);
  const [quoteBalance, setQuoteBalance] = useState(0);
  const isMobile = useIsMobile();
  

  const fetchBalances = async () => {
    const timestamp = Date.now();

    const queryString = `timestamp=${timestamp}`;
    const signature = CryptoJS.HmacSHA256(queryString, apiSecret).toString();

    const url = `${balancesUrl}?${queryString}&signature=${signature}`;

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
        const filteredBalances = data.balances.filter(
          (balance) => parseFloat(balance.free) > 0 || parseFloat(balance.locked) > 0
        );
        setBalances(filteredBalances);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const putOrder = async (side, amount) => {
    const timestamp = Date.now();
    const symbol = `${baseCurrency}${quoteCurrency}`;
    const queryString = `symbol=${symbol}&side=${side}&type=MARKET&quoteOrderQty=${amount}&timestamp=${timestamp}`;
    const signature = CryptoJS.HmacSHA256(queryString, apiSecret).toString();

    const url = `${orderUrl}?${queryString}&signature=${signature}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-MBX-APIKEY": apiKey,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  useEffect(() => {
    if (apiKey && apiSecret) {
      fetchBalances();
    }
  }, [apiKey, apiSecret]);

  useEffect(() => {
    setBaseBalance(parseFloat(balances?.find((b) => b.asset === baseCurrency)?.free || 0));
    setQuoteBalance(parseFloat(balances?.find((b) => b.asset === quoteCurrency)?.free || 0));
  }, [baseCurrency, quoteCurrency, balances]);

  const executeBuy = async () => {
    const amountToBuy = ((quoteBalance * buySliderValue) / 100).toFixed(8);
    await putOrder("BUY", amountToBuy);
    await fetchBalances();
  };
  
  const executeSell = async () => {
    const amountToSell = ((baseBalance * sellSliderValue) / 100).toFixed(8);
    await putOrder("SELL", amountToSell);
    await fetchBalances();
  };

  const handleChangeCoin = (coin) => {
    setBaseCurrency(coin);
    setMarketBuySellStorage('lastBaseCurrency', coin);
    if (coin === "USDT") {
      setQuoteCurrency("TRY");
      setMarketBuySellStorage('lastQuoteCurrency', "TRY");
    }
    else {
      setQuoteCurrency("USDT");
      setMarketBuySellStorage('lastQuoteCurrency', "USDT");
    }
  };

  const getLogo = (symbol) => {
		if (!coinData) {
			return '';
		}
		const coin = coinData.find(data => data.symbol === symbol);
		return coin?.logo;
	}

  const getPrice = (symbol) => {
		if (!coinData) {
			return '';
		}
		const coin = coinData.find(data => data.symbol === symbol);
		return coin?.price;
	}

  return (
    <>
    {apiEnabled &&
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="card-title mb-0">Market Buy/Sell</h5>
            <SearchDropdown options={coinList} handleSelect={handleChangeCoin} currentSelection={baseCurrency} />
          </div>

          <div className="d-flex justify-content-center align-items-center mb-4">
            <img className='mx-1 rounded-circle' src={getLogo(baseCurrency)} width={30}></img>
            <div className="d-flex justify-content-center">{baseCurrency} - {quoteCurrency === "USDT" ? '$' : '₺'}{getPrice(baseCurrency)}</div>
          </div>

          <div className={`d-flex ${isMobile ? 'font-size-10' : 'font-size-12'} text-secondary`}>
            <div className="col-6 d-flex flex-column px-2">
              <div className="d-flex justify-content-end">
                <div>Avlbl:</div>
                <div>&nbsp;{quoteBalance.toFixed(8)} {quoteCurrency}</div>

              </div>
              <div className="mb-4">
                <input 
                  type="range"
                  className="form-range"
                  id="buySlider"
                  min="0"
                  max="100"
                  step="1"
                  value={buySliderValue}
                  onChange={(e) => setBuySliderValue(parseFloat(e.target.value))}
                />
                <div className="d-flex justify-content-end">
                  {buySliderValue}% - {(quoteBalance * buySliderValue / 100).toFixed(8)} {quoteCurrency}
                </div>
              </div>

              <button className="btn btn-success" onClick={executeBuy}>
                Buy
              </button>
            </div>

            <div className="col-6 d-flex flex-column px-2">
              <div className="d-flex justify-content-end">
                <div>Avlbl:</div>
                <div>&nbsp;{baseBalance.toFixed(8)} {baseCurrency}</div>
              </div>
              <div className="mb-4">
                <input
                  type="range"
                  className="form-range"
                  id="sellSlider"
                  min="0"
                  max="100"
                  step="1"
                  value={sellSliderValue}
                  onChange={(e) => setSellSliderValue(parseFloat(e.target.value))}
                />
                <div className="d-flex justify-content-end">
                  {sellSliderValue}% - {(baseBalance * sellSliderValue / 100).toFixed(8)} {baseCurrency}
                </div>
              </div>
              <button className="btn btn-danger" onClick={executeSell}>
                Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  );
};

export default MarketBuySellCard;