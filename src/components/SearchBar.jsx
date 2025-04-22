import { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
		setSearchTerm(value);
    handleSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    handleSearch('');
  };

  return (
    <div className="position-relative d-flex align-items-center">
      <input
        className="form-control"
        type="text"
        id="searchBar"
        placeholder="Search"
        value={searchTerm}
        autoComplete="off"
        onChange={handleChange}
      />
      {searchTerm && (
        <button
          className="btn btn-link border-0 rounded-circle btn-pos text-decoration-none"
          type="button"
          onClick={handleClear}
        >
          <i className="fa-solid fa-xmark text-gray-400" style={{ fontSize: "14px" }}></i>
        </button>
      )}
    </div>
  );
};

export default SearchBar;