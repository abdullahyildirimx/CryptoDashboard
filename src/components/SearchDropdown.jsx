import React, { useState } from 'react';

const SearchDropdown = () => {

  const options = [
    { id: 1, name: 'BTC' },
    { id: 2, name: 'ETH' },
    { id: 3, name: 'USDC' },
    { id: 4, name: 'USDT' },
    { id: 5, name: 'SOL' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchResults, setSearchResults] = useState(options);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredResults = options.filter(item =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleSelect = (item) => {
    setSelectedItem(null);
    setSearchTerm('');
    setSearchResults(options);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle bg-dark"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {selectedItem ? selectedItem.name : 'Add to favorites'}
      </button>
      <div className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton">
        <input
          type="text"
          className="form-control bg-dark text-light"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        {searchResults.map(result => (
          <button
            key={result.id}
            className="dropdown-item bg-dark text-light"
            onClick={() => handleSelect(result)}
          >
            {result.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchDropdown;