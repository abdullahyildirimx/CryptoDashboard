import { useState } from 'react';

const SearchDropdown = ({ options, handleSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filteredSuggestions = options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions(options ?? []);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setSuggestions(options ?? []);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm('');
    setSuggestions([]);
    handleSelect(suggestion);
  };

  return (
    <div className="position-relative">
      <input
        className="form-control"
        type="text"
        id="searchDropdown"
        placeholder="Select Coin"
        value={searchTerm}
        autoComplete="off"
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="dropdown-menu show">
          {suggestions.map((suggestion, index) => (
            <li key={index}>
              <button
                className="dropdown-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;