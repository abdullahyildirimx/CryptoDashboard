import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SpotTable from './SpotTable';
import { useSelector } from 'react-redux';
import './components.css';

const SpotMarketCard = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const [favoritedCoins, setFavoritedCoins] = useState([]);
  const [searchedCoins, setSearchedCoins] = useState([]);
  const { priceData, coinList } = useSelector((state) => state.spotData);

  useEffect(() => {
    const savedFavoriteCoins = JSON.parse(localStorage.getItem('favoriteCoins')) || [];
    setFavoritedCoins(savedFavoriteCoins);
  }, []);
    
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const toggleFavorite = (symbol) => {
    if (favoritedCoins.includes(symbol)) {
      const updatedFavorites = favoritedCoins.filter((coin) => coin !== symbol);
      setFavoritedCoins(updatedFavorites);
      localStorage.setItem('favoriteCoins', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favoritedCoins, symbol];
      setFavoritedCoins(updatedFavorites);
      localStorage.setItem('favoriteCoins', JSON.stringify(updatedFavorites));
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
      
      return sortOrder === 'priceAsc' ? priceA - priceB :
             sortOrder === 'priceDesc' ? priceB - priceA :
             sortOrder === 'symbolAsc' ? symbolA.localeCompare(symbolB) :
             sortOrder === 'symbolDesc' ? symbolB.localeCompare(symbolA) :
             sortOrder === 'changeAsc' ? changeA - changeB :
             sortOrder === 'changeDesc' ? changeB - changeA :
             priceB - priceA;
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
