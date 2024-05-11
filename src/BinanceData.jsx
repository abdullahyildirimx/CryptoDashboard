import React, { useState, useEffect } from 'react';
import './BinanceData.css';
import useSpotData from './hooks/useSpotData';

const BinanceData = () => {
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTab, setSelectedTab] = useState('all');
  const [favoriteCoins, setFavoriteCoins] = useState([]);
  const { priceData, tickSizeData } = useSpotData();

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

  const findPriceData = (symbol) => {
    return priceData && priceData.find(item => item.symbol === symbol);
  };

  const findTickSizeData = (symbol) => {
    return tickSizeData && tickSizeData.find(item => item.symbol === symbol);
  };

  const getPriceWithTickSize = (symbol, price) => {
    let tickSizeDecimals = 8;
    if (tickSizeData) {
      const data = findTickSizeData(symbol);
      if (data) {
        tickSizeDecimals = data.tickSize;
      }
      return parseFloat(price).toFixed(tickSizeDecimals);
    } 
  };

  const getPercent = (percent) => {
    const parsedPercent = parseFloat(percent);
    const formattedPercent = parsedPercent.toFixed(2);
    return parsedPercent < 0 ? `${formattedPercent}%` : `+${formattedPercent}%`;
  };

  const toggleSortOrder = () => {
    // Toggle sorting order between 'asc' and 'desc'
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedPriceData = (sortBy) => {
    if (!priceData) {
      return [];
    }
    return priceData.slice().sort((a, b) => {
      const priceA = parseFloat(a.lastPrice);
      const priceB = parseFloat(b.lastPrice);
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
  };

  return (
    <>
      <div className='col-12'>
        <ul className="nav nav-tabs bg-dark">
          <li className="nav-item bg-dark">
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
        <div className="table-container">
          <table id="example" className="table table-dark table-striped">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Coin</th>
                <th className='d-flex'>Price
                  <button className="mx-1 icon-button" onClick={toggleSortOrder} style={{ color: 'white'}}>
                    {sortOrder === 'asc' ? <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>}
                  </button>
                </th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {sortedPriceData().map((item) => (
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
                  <td>${getPriceWithTickSize(item.symbol, item.lastPrice)}</td>
                  <td>{getPercent(item.priceChangePercent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
        {selectedTab === 'favorite' && (
        <div className="table-container">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Coin</th>
                <th className='d-flex'>Price
                  <button className="mx-1 icon-button" onClick={toggleSortOrder} style={{ color: 'white'}}>
                    {sortOrder === 'asc' ? <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>}
                  </button>
                </th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {favoriteCoins.map((coin) => (
                <tr key={coin}>
                  <td>
                    <button
                      className="icon-button"
                      onClick={() => toggleFavorite(coin)}
                    >
                      {favoriteCoins.includes(coin) ? <i className="fa-solid fa-star" style={{ color: 'gold'}}></i>
                      : <i className="fa-regular fa-star" style={{ color: 'white'}}></i>}
                    </button>
                  </td>
                  <td><i className="fa-brands fa-bitcoin"></i></td>
                  <td>{coin}</td>
                  <td>${getPriceWithTickSize(coin, findPriceData(coin).lastPrice)}</td>
                  <td>{getPercent(findPriceData(coin).priceChangePercent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </>
  );
};

export default BinanceData;