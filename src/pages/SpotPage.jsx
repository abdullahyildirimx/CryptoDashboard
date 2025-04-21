import { useIsMobile } from '../hooks/useScreenSize';
import SpotMarketCard from '../components/SpotMarketCard';
import SpotMarketActivityCard from '../components/SpotMarketActivityCard';
import useSpotData from '../hooks/useSpotData';
import useSpotMarketActivity from '../hooks/useSpotMarketActivity';
import MarketBuySellCard from '../components/MarketBuySellCard';

const SpotPage = () => {
  const isMobile = useIsMobile();
  useSpotData();
  useSpotMarketActivity();
  return (
    <div className='row p-2 g-0'>
      { isMobile ? 
        <>
        <div className='col-12 p-2'>
          <SpotMarketCard />
        </div>
        <div className='col-12 p-2'>
          <MarketBuySellCard />
        </div>
        <div className='col-12 p-2'>
          <SpotMarketActivityCard />
        </div>
        </> 
        : <>
        <div className='col-6 p-2'>
          <SpotMarketCard />
        </div>
        <div className='col-6 p-2'>
          <MarketBuySellCard />
          <SpotMarketActivityCard /> 
        </div>
        </>
      }
    </div>
  );
}
  
export default SpotPage;