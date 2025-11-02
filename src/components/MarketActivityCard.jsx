import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { getFuturesMarketActivityStorage, setFuturesMarketActivityStorage, getSpotMarketActivityStorage, setSpotMarketActivityStorage } from '../utils/localStorageUtils';
import MarketActivity from './MarketActivity';
import { getLogoFromUrl } from '../utils/urls';
import { Checkbox } from '@base-ui-components/react';

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
            <label className="flex items-center gap-1">
              <Checkbox.Root
                className="
                  size-[14px] rounded-sm border border-border-grey 
                  data-checked:border-blue-500 data-checked:bg-blue-500
                  flex items-center justify-center
                  transition-all
                  hover:border-blue-500
                   focus-visible:border-blue-500 focus-visible:outline-none
                "
                checked={showFavorites}
                onCheckedChange={(value) => handleToggleFavorites(value)}
              >
                <Checkbox.Indicator>
                  <i className="fa-solid fa-check text-[10px]" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Show only favorites
            </label>
          </div>
          <i className="fa-regular fa-circle-question" data-tooltip-id="infoTooltip2"></i>
        </div>
      </div>
      <Tooltip
        className="w-50! opacity-100!"
        id="infoTooltip1"
        place="bottom"
        variant="dark"
        content="5 minutes unusual price activity. For BTC, ETH and USDT, it is triggered when price is changed over 1%, for other coins it is 3%."
      />
      <Tooltip
        className="w-50! opacity-100!"
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