import MarketCard from '../components/MarketPricesCard';
import MarketActivityCard from '../components/MarketActivityCard';
import useSpotData from '../hooks/useSpotData';
import useSpotMarketActivity from '../hooks/useSpotMarketActivity';

const SpotPage = () => {
  useSpotData();
  useSpotMarketActivity();
  return (
    <div className='p-2 grid grid-cols-1 md:grid-cols-2'>
      <div className='p-2'>
        <MarketCard isSpot />
      </div>
      <div className='p-2'>
        <MarketActivityCard isSpot /> 
      </div>
    </div>
  );
}
  
export default SpotPage;