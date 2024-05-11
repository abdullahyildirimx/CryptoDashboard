import React from 'react';
import SearchDropdown from './SearchDropdown';
import './BinanceData.css';

const TopMovers = () => {

  const currencyPairs = [
    { name: 'PEOPLE/BTC', change: -7.32, isNewLow: true },
    { name: 'RVN/BTC', change: -7.84, isNewLow: true },
    { name: 'ENA/USDT', change: +7.09, isNewHigh: true },
    { name: 'BAL/BTC', change: -7.02, isNewLow: true },
  ];

  return (
    <div className="top-movers p-2">
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <span>Top Movers</span>
        <span><SearchDropdown /></span>
      </div>
      {currencyPairs.map(pair => (
        <div key={pair.name} className="currency-pair">
          <span>{pair.name}</span>
          <span className={`price-change ${pair.change > 0 ? 'positive' : 'negative'}`}>
            <span className="icon">{pair.change > 0 ? '↑' : '↓'}</span>
            {Math.abs(pair.change)}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default TopMovers;