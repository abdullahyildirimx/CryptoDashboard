import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useScreenSize';
import './components.css';
import SearchBar from './SearchBar';

const SpotMarketCard = ({ priceData, coinList }) => {
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTab, setSelectedTab] = useState('favorite');
  const [favoriteCoins, setFavoriteCoins] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const isMobile = useIsMobile();
  useEffect(() => {
    const savedFavoriteCoins = JSON.parse(localStorage.getItem('favoriteCoins')) || [];
    setFavoriteCoins(savedFavoriteCoins);
  }, []);
    
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const toggleFavorite = (symbol) => {
    if (favoriteCoins.includes(symbol)) {
      const updatedFavorites = favoriteCoins.filter((coin) => coin !== symbol);
      setFavoriteCoins(updatedFavorites);
      localStorage.setItem('favoriteCoins', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favoriteCoins, symbol];
      setFavoriteCoins(updatedFavorites);
      localStorage.setItem('favoriteCoins', JSON.stringify(updatedFavorites));
    }
  };

  const getPercent = (percent) => {
    const parsedPercent = parseFloat(percent);
    const formattedPercent = parsedPercent.toFixed(2);
    return parsedPercent < 0 ? `${formattedPercent}%` : `+${formattedPercent}%`;
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedFavoriteCoins = () => {
    if (!priceData) {
      return [];
    }
    if (selectedCoins.length) {
      return selectedCoins;
    }
    const sortedCoins = favoriteCoins.map(symbol => {
      const coin = priceData.find(data => data.symbol === symbol);
      return coin ? coin : null;
    }).filter(Boolean);
    return sortOrder === 'asc' ? sortedCoins.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)) : sortedCoins.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  };

  const sortedAllCoins = () => {
    if (!priceData) {
      return [];
    }
    if (selectedCoins.length) {
      return selectedCoins;
    }
    return priceData.slice().sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
  };

  const handleSearch = (coins) => {
    if (!priceData) {
      return [];
    }
    const sortedCoins = coins.map(symbol => {
      const coin = priceData.find(data => data.symbol === symbol);
      return coin ? coin : null;
    }).filter(Boolean);
    setSelectedCoins(sortOrder === 'asc' ? sortedCoins.slice().sort((a, b) => parseFloat(a.price) - parseFloat(b.price)) : sortedCoins.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
  };

  return (
    <div className="card bg-dark">
      <div className="card-body">
        <div className='d-flex justify-content-between'>
          <h5 className="card-title mb-3">Spot Market</h5>
          <SearchBar options={coinList} handleSelect={handleSearch} />
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
        {selectedTab === 'all' && (
          <div className={`${isMobile ? 'table-container-mobile' : 'table-container'}`}>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Coin</th>
                  <th className='d-flex'>Price
                    <button className="mx-1 icon-button" onClick={toggleSortOrder}>
                      {sortOrder === 'asc' ? <i className="fa-solid fa-arrow-up text-white"></i> : <i className="fa-solid fa-arrow-down text-white"></i>}
                    </button>
                  </th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {sortedAllCoins().map((item) => (
                  <tr key={item.symbol}>
                    <td>
                      <button
                        className="icon-button"
                        onClick={() => toggleFavorite(item.symbol)}
                      >
                        {favoriteCoins.includes(item.symbol) ? <i className="fa-solid fa-star" style={{ color: 'gold'}}></i>
                        : <i className="fa-regular fa-star" style={{ color: 'white'}}></i>}
                      </button>
                    </td>
                    <td><i className="fa-brands fa-bitcoin"></i></td>
                    <td>{item.symbol}</td>
                    <td><span>{item.currency}{item.price}</span></td>
                    <td>{getPercent(item.change)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedTab === 'favorite' && (
          <div className={`${isMobile ? 'table-container-mobile' : 'table-container'}`}>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Coin</th>
                  <th className='d-flex'>Price
                    <button className="mx-1 icon-button" onClick={toggleSortOrder}>
                      {sortOrder === 'asc' ? <i className="fa-solid fa-arrow-up text-white"></i> : <i className="fa-solid fa-arrow-down text-white"></i>}
                    </button>
                  </th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {sortedFavoriteCoins().map((coin) => (
                  <tr key={coin.symbol}>
                    <td>
                    <button
                        className="icon-button"
                        onClick={() => toggleFavorite(coin.symbol)}
                      >
                        {favoriteCoins.includes(coin.symbol) ? <i className="fa-solid fa-star" style={{ color: 'gold'}}></i>
                        : <i className="fa-regular fa-star" style={{ color: 'white'}}></i>}
                      </button>
                    </td>
                    <td><i className="fa-brands fa-bitcoin"></i></td>
                    <td>{coin.symbol}</td>
                    <td><span>{coin.currency}{coin.price}</span></td>
                    <td>{getPercent(coin.change)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotMarketCard;
