import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import FuturesTable from './FuturesTable';
import { getFuturesCardStorage, setFuturesCardStorage } from '../utils/localStorageUtils';
import { setFuturesFavoriteCoins } from '../utils/reduxStorage';
import { useIsMobile } from '../hooks/useScreenSize';

const FuturesMarketCard = () => {
  const localStorageData = getFuturesCardStorage();
  const [selectedTab, setSelectedTab] = useState(localStorageData?.selectedTab || 'all');
  const [sortOrder, setSortOrder] = useState('default');
  const [searchedCoins, setSearchedCoins] = useState([]);
  const { futuresCoinData, futuresCoinList, futuresFavoriteCoins } = useSelector((state) => state.dataStore);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setFuturesCardStorage('selectedTab', tab);
  };

  const toggleFavorite = (symbol) => {
    if (futuresFavoriteCoins.includes(symbol)) {
      const updatedFavorites = futuresFavoriteCoins.filter((coin) => coin !== symbol);
      dispatch(setFuturesFavoriteCoins(updatedFavorites));
      setFuturesCardStorage('favoriteCoins', updatedFavorites);
    } else {
      const updatedFavorites = [...futuresFavoriteCoins, symbol];
      dispatch(setFuturesFavoriteCoins(updatedFavorites));
      setFuturesCardStorage('favoriteCoins', updatedFavorites);
    }
  };

  const toggleSortOrder = (column) => {
    let nextOrder = 'default';
    if (column === 'price') {
      nextOrder =
          sortOrder === 'priceDesc' ? 'default' :
          sortOrder === 'priceAsc' ? 'priceDesc' :
          'priceAsc';
    } 
    else if (column === 'change') {
        nextOrder =
            sortOrder === 'changeDesc' ? 'default' :
            sortOrder === 'changeAsc' ? 'changeDesc' :
            'changeAsc';
    } 
    else {
        nextOrder =
            sortOrder === 'symbolDesc' ? 'default' :
            sortOrder === 'symbolAsc' ? 'symbolDesc' :
            'symbolAsc';
    }
    setSortOrder(nextOrder);
  };

  const sortedAllCoins = () => {
    if (!futuresCoinData) {
      return [];
    }
    let coins = [];
    if (searchedCoins.length > 0) {
      coins = searchedCoins .map(symbol => {
        return futuresCoinData.find(data => data.symbol === symbol) || null;
      }).filter(coin => coin !== null);
    }
    else if (selectedTab === 'favorite') {
      coins = futuresFavoriteCoins.map(symbol => {
        return futuresCoinData.find(data => data.symbol === symbol) || null;
      }).filter(coin => coin !== null);
    }
    else {
      coins = futuresCoinData;
    }
    
    return coins.slice().sort((a, b) => {
      const symbolA = a.symbol;
      const symbolB = b.symbol;
      const changeA = parseFloat(a.change);
      const changeB = parseFloat(b.change);
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      const volumeA = parseFloat(a.volume);
      const volumeB = parseFloat(b.volume);
      
      return sortOrder === 'priceAsc' ? priceA - priceB :
             sortOrder === 'priceDesc' ? priceB - priceA :
             sortOrder === 'symbolAsc' ? symbolA.localeCompare(symbolB) :
             sortOrder === 'symbolDesc' ? symbolB.localeCompare(symbolA) :
             sortOrder === 'changeAsc' ? changeA - changeB :
             sortOrder === 'changeDesc' ? changeB - changeA :
             volumeB - volumeA;
    });
  };

  const handleSearch = (result) => {
    if (!futuresCoinData) {
      return [];
    }
    if (result) {
			const filteredResults = futuresCoinList.filter(item =>
				item.toLowerCase().includes(result.toLowerCase())
			);
			setSearchedCoins(filteredResults);
		}
    else {
      setSearchedCoins([]);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className='d-flex justify-content-between'>
          <h5 className="card-title mb-3">Futures Market</h5>
          <SearchBar handleSearch={handleSearch} />
        </div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${selectedTab === 'favorite' ? 'active' : 'text-white'}`}
              onClick={() => handleTabChange('favorite')}
            >
              Favorite
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${selectedTab === 'all' ? 'active' : 'text-white'}`}
              onClick={() => handleTabChange('all')}
            >
              All
            </button>
          </li>
        </ul>
        <div className={`${isMobile ? 'table-container-mobile' : 'table-container'} ${ !futuresCoinData ? 'd-flex justify-content-center align-items-center' : ''}`}>
          {futuresCoinData ? ((selectedTab === 'favorite' && !futuresFavoriteCoins.length && !searchedCoins.length) ? (
              <div className='h-100 d-flex justify-content-center align-items-center'>
                You don&apos;t have any favorite coins.
              </div>
            ) : (
              <FuturesTable
                content={sortedAllCoins}
                favoriteCoins={futuresFavoriteCoins}
                sortOrder={sortOrder}
                toggleFavorite={toggleFavorite}
                toggleSortOrder={toggleSortOrder}
              />
            )
          ) : (
            <div className="spinner-border text-primary" role="status"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FuturesMarketCard;
