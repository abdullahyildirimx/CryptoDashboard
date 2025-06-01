import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import SpotTable from './SpotTable';
import { getSpotCardStorage, setSpotCardStorage } from '../utils/localStorageUtils';
import { setSpotFavoriteCoins } from '../utils/reduxStorage';
import { useIsMobile } from '../hooks/useScreenSize';

const SpotMarketCard = () => {
  const localStorageData = getSpotCardStorage();
  const [selectedTab, setSelectedTab] = useState(localStorageData?.selectedTab || 'all');
  const [sortOrder, setSortOrder] = useState('default');
  const [searchedCoins, setSearchedCoins] = useState([]);
  const { spotCoinData, spotCoinList, spotFavoriteCoins } = useSelector((state) => state.dataStore);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSpotCardStorage('selectedTab', tab);
  };

  const toggleFavorite = (symbol) => {
    if (spotFavoriteCoins.includes(symbol)) {
      const updatedFavorites = spotFavoriteCoins.filter((coin) => coin !== symbol);
      dispatch(setSpotFavoriteCoins(updatedFavorites));
      setSpotCardStorage('favoriteCoins', updatedFavorites);
    } else {
      const updatedFavorites = [...spotFavoriteCoins, symbol];
      dispatch(setSpotFavoriteCoins(updatedFavorites));
      setSpotCardStorage('favoriteCoins', updatedFavorites);
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
    if (!spotCoinData) {
      return [];
    }
    let coins = [];
    if (searchedCoins.length > 0) {
      coins = searchedCoins .map(symbol => {
        return spotCoinData.find(data => data.symbol === symbol) || null;
      }).filter(coin => coin !== null);
    }
    else if (selectedTab === 'favorite') {
      coins = spotFavoriteCoins.map(symbol => {
        return spotCoinData.find(data => data.symbol === symbol) || null;
      }).filter(coin => coin !== null);
    }
    else {
      coins = spotCoinData;
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
    if (!spotCoinData) {
      return [];
    }
    if (result) {
			const filteredResults = spotCoinList.filter(item =>
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
          <h5 className="card-title mb-3">Spot Market</h5>
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
        <div className={`${isMobile ? 'table-container-mobile' : 'table-container'} ${ !spotCoinData ? 'd-flex justify-content-center align-items-center' : ''}`}>
          {spotCoinData ? ((selectedTab === 'favorite' && !spotFavoriteCoins.length && !searchedCoins.length) ? (
              <div className='h-100 d-flex justify-content-center align-items-center'>
                You don&apos;t have any favorite coins.
              </div>
            ) : (
              <SpotTable
                content={sortedAllCoins}
                favoriteCoins={spotFavoriteCoins}
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

export default SpotMarketCard;
