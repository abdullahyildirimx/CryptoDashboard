import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { useIsMobile } from '../hooks/useScreenSize';
import { getMarketActivityStorage, setMarketActivityStorage } from '../utils/localStorageUtils';
import MarketActivity from './MarketActivity';

const MarketActivityCard = () => {
  const localStorageActivity = getMarketActivityStorage();
  const isMobile = useIsMobile();
  const [showFavorites, setShowFavorites] = useState(localStorageActivity?.showFavorites || false);
  const { marketActivity, favoriteCoins } = useSelector((state) => state.dataStore);

  const activity = marketActivity ? (showFavorites
  ? marketActivity.filter(item => favoriteCoins.includes(item.symbol))
  : marketActivity) : [];

  const handleToggleFavorites = (newValue) => {
    setShowFavorites(newValue)
    setMarketActivityStorage('showFavorites', newValue);
  };
  
  return (
    <div className="card">
      <div className="card-body">
        <div className={`d-flex ${isMobile ? 'flex-column' : ''} justify-content-between`}>
          <div className='d-flex align-items-center mb-3'>
            <h5 className="card-title mb-0 me-1">Market Activity</h5>
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
          {marketActivity ?
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

export default MarketActivityCard;