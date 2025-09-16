import MarketPricesCard from '../components/MarketPricesCard';
import MarketActivityCard from '../components/MarketActivityCard';
import useFuturesData from '../hooks/useFuturesData';
import useFuturesMarketActivity from '../hooks/useFuturesMarketActivity';

const FuturesPage = () => {
  useFuturesData();
  useFuturesMarketActivity();
  return (
    <div className='p-2 grid grid-cols-1 md:grid-cols-2'>
      <div className='p-2'>
        <MarketPricesCard />
      </div>
      <div className='p-2'>
        <MarketActivityCard /> 
      </div>
    </div>
  );
}
  
export default FuturesPage;