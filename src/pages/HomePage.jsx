import React from 'react';
import BinanceData from '../BinanceData';
import TopMovers from '../TopMovers';
import { useIsMobile } from '../hooks/useScreenSize';

const HomePage = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <div className='HomePage row col-12 p-3 g-0'>
        <div className={`${isMobile ? 'col-12' : 'col-6 p-2'}`}>
          <BinanceData />
        </div>
        <div className={`${isMobile ? 'col-12' : 'col-6 p-2'}`}>
          <TopMovers />
        </div> 
      </div>
    </>
  );
}
  
export default HomePage;