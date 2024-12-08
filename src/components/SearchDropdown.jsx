import { useState } from 'react';

const SearchDropdown = ({ options, handleSelect, currentSelection }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(currentSelection); // Default button name

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    if (!isDropdownOpen) {
      setSuggestions(options ?? []);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filteredSuggestions = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions(options ?? []);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedOption(suggestion);
    setSearchTerm('');
    setIsDropdownOpen(false);
    handleSelect(suggestion);
  };

  return (
    <div className="position-relative">
      <button
        className="btn btn-dark dropdown-button d-flex justify-content-between align-items-center"
        onClick={toggleDropdown}
        type="button"
      >
        {selectedOption}
        <i className="fa-solid fa-angle-down"></i>
      </button>

      {isDropdownOpen && (
        <div className="dropdown-menu show p-2">
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Search"
            value={searchTerm}
            autoComplete="off"
            onChange={handleChange}
          />
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                  <button key={index}
                    className="dropdown-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
              ))
            ) : (
              <li className="dropdown-item text-secondary">No results found</li>
            )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;