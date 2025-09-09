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
    <div className="relative">
      <input
        className="w-50 text-[12px] md:text-[14px] border-[1px] rounded-[6px] border-border-grey py-1.5 px-3 focus:border-border-blue focus:outline-none focus:shadow-[0_0_0_0.25rem_#0d6efd40]"
        type="text"
        id="searchBar"
        placeholder="Search"
        value={searchTerm}
        autoComplete="off"
        onChange={handleChange}
      />
      {searchTerm && (
        <button
          className="absolute border-0 rounded-full flex items-center justify-center top-1/2 -translate-y-1/2 right-[6px] h-[20px] w-[20px]"
          type="button"
          onClick={handleClear}
        >
          <i className="fa-solid fa-xmark text-[12px] md:text-[14px] text-border-blue"></i>
        </button>
      )}
    </div>
  );
};

export default SearchBar;