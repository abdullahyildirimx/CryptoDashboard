import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { useIsMobile } from '../hooks/useScreenSize';
import { getSpotMarketActivityStorage, setSpotMarketActivityStorage } from '../utils/localStorageUtils';
import MarketActivity from './MarketActivity';

const SpotMarketActivityCard = () => {
  const localStorageActivity = getSpotMarketActivityStorage();
  const isMobile = useIsMobile();
  const [showFavorites, setShowFavorites] = useState(localStorageActivity?.showFavorites || false);
  const { spotCoinData, spotMarketActivity, spotFavoriteCoins } = useSelector((state) => state.dataStore);

  const handleToggleFavorites = (newValue) => {
    setShowFavorites(newValue)
    setSpotMarketActivityStorage('showFavorites', newValue);
  };

	const getLogo = (symbol) => {
		return spotCoinData?.find(data => data.symbol === symbol)?.logo || '/genericicon.png';
	}

  const formatPrice = (symbol, price) => {
    const tickSize = spotCoinData?.find(data => data.symbol === symbol)?.tickSize;
    return tickSize ? parseFloat(price).toFixed(tickSize) : price;
  };
  
  const activity = spotMarketActivity
  ? (showFavorites
      ? spotMarketActivity.filter(item => spotFavoriteCoins.includes(item.symbol))
      : spotMarketActivity
    ).map(item => ({
      ...item,
      oldPrice: formatPrice(item.symbol, item.oldPrice),
      newPrice: formatPrice(item.symbol, item.newPrice),
      logo: getLogo(item.symbol)
    }))
  : [];

  return (
    <div className="card">
      <div className="card-body">
        <div className={`d-flex ${isMobile ? 'flex-column' : ''} justify-content-between`}>
          <div className='d-flex align-items-center mb-3'>
            <h5 className="card-title mb-0 me-1">Spot Market Activity</h5>
            <i className="fa-regular fa-circle-question" data-tooltip-id="infoTooltip1"></i>
          </div>
          <div className='d-flex align-items-center mb-3'>

            <div className="d-flex align-items-center me-1">
              <input className="form-check-input mt-0 me-1" type="checkbox" id="inlineCheckbox1" checked={showFavorites} onChange={() => handleToggleFavorites(!showFavorites)} />
              <label className="form-check-label" htmlFor="inlineCheckbox1">Show only favorites</label>
            </div>
            <i className="fa-regular fa-circle-question" data-tooltip-id="infoTooltip2"></i>
          </div>
        </div>
        <Tooltip
          style={{width: '180px'}}
          id="infoTooltip1"
          place="bottom"
          variant="dark"
          content="5 minutes unusual price activity. For BTC, ETH and USDT, it is triggered when price is changed over 1%, for other coins it is 3%."
        />
        <Tooltip
          style={{width: '180px'}}
          id="infoTooltip2"
          place="bottom"
          variant="dark"
          content="You may see too much notifications when it is not checked."
        />
        <div className={`${isMobile ? 'activity-container-mobile' : 'activity-container'} ${!activity.length ? 'd-flex justify-content-center align-items-center' : ''}`}>
          {spotMarketActivity ?
            <>
              <MarketActivity activity={activity} />
              {!activity.length &&
                (showFavorites 
                  ? <p>There is no market activity for your favorite coins.</p> 
                  : <p>There is no market activity.</p>
                )
              }
            </>
            : <div className="spinner-border text-primary" role="status"></div>
          }
        </div>
      </div>
    </div>
  );
};

export default SpotMarketActivityCard;