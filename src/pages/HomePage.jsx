import { useIsMobile } from '../hooks/useScreenSize';
import SpotMarketCard from '../components/SpotMarketCard';
import MarketActivityCard from '../components/MarketActivityCard';
import useSpotData from '../hooks/useSpotData';

const HomePage = () => {
  const isMobile = useIsMobile();
  useSpotData();

  return (
    <>
      <div className='row p-2 g-0'>
        <div className={`${isMobile ? 'col-12 mb-3 p-2' : 'col-6 p-2'}`}>
          <SpotMarketCard />
        </div>
        <div className={`${isMobile ? 'col-12 mb-3 p-2' : 'col-6 p-2'}`}>
          <MarketActivityCard />
        </div>
      </div>
    </>
  );
}
  
export default HomePage;