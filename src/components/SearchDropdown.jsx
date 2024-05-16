import React, { useEffect, useState } from 'react';

const SearchDropdown = ({ options }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (options) {
      setSearchResults(options);
    }
  }, [options]);

  const handleChange = (event) => {
    const value = event.target.value;
		setSearchTerm(value);
    handleSearch(value);
  };

  const handleSearch = (result) => {
    if (result) {
			const filteredResults = options.filter(item =>
				item.toLowerCase().startsWith(result.toLowerCase())
			);
			setSearchResults(filteredResults);
		}
    else {
      setSearchResults(options);
    }
  };

  const handleSelect = (item) => {
    setSelectedItem(null);
    setSearchTerm('');
    setSearchResults(options);
  };

  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedItem ? selectedItem : 'Add to favorites'}
      </button>
      <div className="dropdown-menu p-2" aria-labelledby="dropdownMenuButton">
        <input
          type="text"
          className="form-control"
          id="dropdownSearchBar"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        {searchResults.map(result => (
          <button
            key={result}
            className="dropdown-item"
            onClick={() => handleSelect(result)}
          >
            {result}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchDropdown;