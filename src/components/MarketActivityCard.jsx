import React from 'react';
import SearchDropdown from './SearchDropdown';
import './components.css';

const MarketActivityCard = () => {

  const activities = [
    { symbol: 'PEOPLE', change: -7.32 },
    { symbol: 'RVN', change: -7.84 },
    { symbol: 'ENA', change: +7.09 },
    { symbol: 'BAL', change: -7.02 },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title">Market Activity</h5>
          <span><SearchDropdown /></span>
        </div>
        {activities.map(coin => (
          <div key={coin.symbol} className="currency-pair">
            <span>{coin.symbol}</span>
            <span className={`price-change ${coin.change > 0 ? 'positive' : 'negative'}`}>
              <span className="icon">{coin.change > 0 ? '↑' : '↓'}</span>
              {Math.abs(coin.change)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketActivityCard;