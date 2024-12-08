import { useIsMobile } from '../hooks/useScreenSize';
import SpotMarketCard from '../components/SpotMarketCard';
import MarketActivityCard from '../components/MarketActivityCard';
import useSpotData from '../hooks/useSpotData';
import useMarketActivity from '../hooks/useMarketActivity';
import MarketBuySellCard from '../components/MarketBuySellCard';

const HomePage = () => {
  const isMobile = useIsMobile();
  useSpotData();
  useMarketActivity();
  return (
    <div className='row p-2 g-0'>
      { isMobile ? 
        <>
        <div className='col-12 mb-2 p-2'>
          <SpotMarketCard />
        </div>
        <div className='col-12 mb-2 p-2'>
          <MarketBuySellCard />
        </div>
        <div className='col-12 mb-2 p-2'>
          <MarketActivityCard />
        </div>
        </> 
        : <>
        <div className='col-6 p-2'>
          <SpotMarketCard />
        </div>
        <div className='col-6 p-2'>
          <div className='mb-3'>
            <MarketBuySellCard />
          </div>
          <MarketActivityCard /> 
        </div>
        </>
      }
    </div>
  );
}
  
export default HomePage;