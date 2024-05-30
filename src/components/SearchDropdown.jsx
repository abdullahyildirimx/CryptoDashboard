import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';

const SearchDropdown = ({ options }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (options) {
      setSearchResults(options);
    }
  }, [options]);

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

  const handleSelect = () => {
    setSelectedItem(null);
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
        <div className='mb-2'>
          <SearchBar handleSearch={handleSearch} />
        </div>
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