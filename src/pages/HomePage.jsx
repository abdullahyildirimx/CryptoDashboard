import React from 'react';
import { useIsMobile } from '../hooks/useScreenSize';
import SpotMarketCard from '../components/SpotMarketCard';
import MarketActivityCard from '../components/MarketActivityCard';

const HomePage = ({priceData, coinList}) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <div className='row col-12 p-3 g-0'>
        <div className={`${isMobile ? 'col-12 mb-3' : 'col-6 p-2'}`}>
          <SpotMarketCard priceData={priceData} coinList={coinList} />
        </div>
        <div className={`${isMobile ? 'col-12 mb-3' : 'col-6 p-2'}`}>
          <MarketActivityCard />
        </div> 
      </div>
    </>
  );
}
  
export default HomePage;