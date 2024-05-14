import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
		setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div>
      <input
        className="form-control bg-dark text-light"
        type="text"
        placeholder='Search'
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;