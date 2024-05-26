import { useState } from 'react';

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
        className="form-control"
        type="text"
        id="searchBar"
        placeholder='Search'
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;