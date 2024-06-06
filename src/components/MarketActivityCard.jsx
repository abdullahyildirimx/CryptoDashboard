import SearchDropdown from './SearchDropdown';
import { useSelector } from 'react-redux';

const MarketActivityCard = () => {

  const { coinList, marketActivity } = useSelector((state) => state.dataStore);
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title">Market Activity</h5>
          <span><SearchDropdown options={coinList}/></span>
        </div>
        {marketActivity.map((item, index) => (
          <div key={index} className="currency-pair">
            <span>{item.symbol}</span>
            <span className={`change ${item.change < 0 ? 'negative' : 'positive'}`}>
              <span className="icon">{item.change > 0 ? '↑' : '↓'}</span>
              {Math.abs(item.change)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketActivityCard;