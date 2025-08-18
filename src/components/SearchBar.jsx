import { useState } from 'react';
import { useIsMobile } from '../hooks/useScreenSize';

const SearchBar = ({ handleSearch }) => {
  const isMobile = useIsMobile();
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
        className={`form-control ${isMobile ? 'font-size-12' : 'font-size-14'}`}
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
          <i className={`fa-solid fa-xmark text-gray-400 ${isMobile ? 'font-size-12' : 'font-size-14'}`}></i>
        </button>
      )}
    </div>
  );
};

export default SearchBar;