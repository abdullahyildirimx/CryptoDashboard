import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { getFuturesMarketActivityStorage, setFuturesMarketActivityStorage, getSpotMarketActivityStorage, setSpotMarketActivityStorage } from '../utils/localStorageUtils';
import MarketActivity from './MarketActivity';
import { getLogoFromUrl } from '../utils/urls';

const MarketActivityCard = ({ isSpot = false }) => {
  const localStorageActivity = isSpot ? getSpotMarketActivityStorage() : getFuturesMarketActivityStorage(); 
  const [showFavorites, setShowFavorites] = useState(localStorageActivity?.showFavorites || false);
  const { spotCoinData, spotMarketActivity, spotFavoriteCoins, futuresCoinData, futuresMarketActivity, futuresFavoriteCoins } = useSelector((state) => state.dataStore);
  const selectedCoinData = isSpot ? spotCoinData : futuresCoinData;
  const selectedMarketActivity = isSpot ? spotMarketActivity : futuresMarketActivity;
  const selectedFavoriteCoins = isSpot ? spotFavoriteCoins : futuresFavoriteCoins;

  const handleToggleFavorites = (newValue) => {
    setShowFavorites(newValue);
    if (isSpot) {
      setSpotMarketActivityStorage('showFavorites', newValue);
    }
    else {
      setFuturesMarketActivityStorage('showFavorites', newValue);
    }
  };

	const getLogo = (symbol) => {
    const url = selectedCoinData?.find(data => data.symbol === symbol)?.logo;
		return url ? getLogoFromUrl(url) : '/genericicon.png';
	}

  const formatPrice = (symbol, price) => {
    const tickSize = selectedCoinData?.find(data => data.symbol === symbol)?.tickSize;
    return tickSize ? parseFloat(price).toFixed(tickSize) : price;
  };
  
  const activity = selectedMarketActivity
  ? (showFavorites
      ? selectedMarketActivity.filter(item => selectedFavoriteCoins.includes(item.symbol))
      : selectedMarketActivity.slice(0, 1000)
    ).map(item => ({
      ...item,
      oldPrice: formatPrice(item.symbol, item.oldPrice),
      newPrice: formatPrice(item.symbol, item.newPrice),
      logo: getLogo(item.symbol)
    }))
  : [];

  return (
    <div className="bg-black1 rounded-[16px] p-4 text-white1 text-[14px] font-medium border border-white-15">
      <div className={`flex flex-col md:flex-row justify-between mt-1`}>
        <div className='flex items-center mb-4 self-stretch'>
          <h1 className="text-[20px] leading-[1.2] mr-1">{isSpot ? 'Spot' : 'Futures'} Market Activity</h1>
          <i className="fa-regular fa-circle-question" data-tooltip-id="infoTooltip1"></i>
        </div>
        <div className='flex items-center mb-4'>
          <div className="flex items-center mr-1">
            <input   className="relative mr-1 w-[14px] h-[14px] rounded-[4px] border-[1px] border-border-grey appearance-none
             focus:outline-none focus:shadow-[0_0_0_0.25rem_#0d6efd40] focus:border-border-blue focus:checked:border-blue-500 checked:bg-blue-500 checked:border-blue-500
             checked:after:content-[''] checked:after:absolute checked:after:top-[5px] checked:after:left-1/2
             checked:after:w-[4px] checked:after:h-[8px] checked:after:border-white checked:after:border-[0_2px_2px_0]
             checked:after:rotate-[45deg] checked:after:-translate-x-1/2 checked:after:-translate-y-1/2" type="checkbox" id="inlineCheckbox1" checked={showFavorites} onChange={() => handleToggleFavorites(!showFavorites)} />
            <label htmlFor="inlineCheckbox1">Show only favorites</label>
          </div>
          <i className="fa-regular fa-circle-question" data-tooltip-id="infoTooltip2"></i>
        </div>
      </div>
      <Tooltip
        className="!w-50 !opacity-100"
        id="infoTooltip1"
        place="bottom"
        variant="dark"
        content="5 minutes unusual price activity. For BTC, ETH and USDT, it is triggered when price is changed over 1%, for other coins it is 3%."
      />
      <Tooltip
        className="!w-50 !opacity-100"
        id="infoTooltip2"
        place="bottom"
        variant="dark"
        content="If 'Show only favorites' is unchecked, you may see many activities. The latest maximum of 1000 activities is displayed at once."
      />
      <div className={`h-[280px] md:h-[calc(100vh-193px)] text-[12px] md:text-[14px] overflow-y-auto ${!activity.length ? 'flex justify-center items-center' : ''}`}>
        {selectedMarketActivity ?
          <>
            <MarketActivity activity={activity} isSpot={isSpot} />
            {!activity.length &&
              (showFavorites 
                ? <p>There is no market activity for your favorite coins.</p> 
                : <p>There is no market activity.</p>
              )
            }
          </>
          :           
          <div className="flex items-center justify-center h-full">
            <div className="w-9 h-9 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      </div>
    </div>
  );
};

export default MarketActivityCard;