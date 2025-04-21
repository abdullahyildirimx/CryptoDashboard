import { useIsMobile } from '../hooks/useScreenSize';
import FuturesMarketCard from '../components/FuturesMarketCard';
import FuturesMarketActivityCard from '../components/FuturesMarketActivityCard';
import useFuturesData from '../hooks/useFuturesData';
import useFuturesMarketActivity from '../hooks/useFuturesMarketActivity';
import MarketBuySellCard from '../components/MarketBuySellCard';

const FuturesPage = () => {
  const isMobile = useIsMobile();
  useFuturesData();
  useFuturesMarketActivity();
  return (
    <div className='row p-2 g-0'>
      { isMobile ? 
        <>
        <div className='col-12 p-2'>
          <FuturesMarketCard />
        </div>
        <div className='col-12 p-2'>
          <MarketBuySellCard />
        </div>
        <div className='col-12 p-2'>
          <FuturesMarketActivityCard />
        </div>
        </> 
        : <>
        <div className='col-6 p-2'>
          <FuturesMarketCard />
        </div>
        <div className='col-6 p-2'>
          <MarketBuySellCard />
          <FuturesMarketActivityCard /> 
        </div>
        </>
      }
    </div>
  );
}
  
export default FuturesPage;