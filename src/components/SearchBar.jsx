import React, { useState } from 'react';

const SearchBar = ({ options, handleSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
		setSearchTerm(event.target.value);
		if (event.target.value) {
			const filteredResults = options.filter(item =>
				item.toLowerCase().startsWith(event.target.value.toLowerCase())
			);
			handleSelect(filteredResults);
		}
    else {
      handleSelect([]);
    }
  };

  return (
    <div>
      <input
        className="form-control"
        type="text"
        placeholder='Search'
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;