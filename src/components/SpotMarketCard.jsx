import { useState } from 'react';
import SearchBar from './SearchBar';
import SpotTable from './SpotTable';
import { getSpotCardStorage, setSpotCardStorage } from '../utils/localStorageUtils';
import { useSelector } from 'react-redux';

const SpotMarketCard = () => {
  const localStorageData = getSpotCardStorage();
  const [selectedTab, setSelectedTab] = useState(localStorageData.selectedTab || 'all');
  const [favoritedCoins, setFavoritedCoins] = useState(localStorageData.favoriteCoins || []);
  const [sortOrder, setSortOrder] = useState(localStorageData.sortOrder || 'default');
  const [searchedCoins, setSearchedCoins] = useState([]);
  const { priceData, coinList } = useSelector((state) => state.dataStore);
    
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSpotCardStorage('selectedTab', tab);
  };

  const toggleFavorite = (symbol) => {
    if (favoritedCoins.includes(symbol)) {
      const updatedFavorites = favoritedCoins.filter((coin) => coin !== symbol);
      setFavoritedCoins(updatedFavorites);
      setSpotCardStorage('favoriteCoins', updatedFavorites);
    } else {
      const updatedFavorites = [...favoritedCoins, symbol];
      setFavoritedCoins(updatedFavorites);
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
    setSpotCardStorage('sortOrder', nextOrder);
  };

  const sortedAllCoins = () => {
    if (!priceData) {
      return [];
    }
    let coins = [];
    if (searchedCoins.length > 0) {
      coins = searchedCoins.map(symbol => {
        return priceData.find(data => data.symbol === symbol);
      });

    }
    else if (selectedTab === 'favorite') {
      coins = favoritedCoins.map(symbol => {
        return priceData.find(data => data.symbol === symbol);
      });
    }
    else {
      coins = priceData;
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
    if (!priceData) {
      return [];
    }
    if (result) {
			const filteredResults = coinList.filter(item =>
				item.toLowerCase().startsWith(result.toLowerCase())
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
        <SpotTable content={sortedAllCoins} favoritedCoins={favoritedCoins} sortOrder={sortOrder} toggleFavorite={toggleFavorite} toggleSortOrder={toggleSortOrder} />
      </div>
    </div>
  );
};

export default SpotMarketCard;
