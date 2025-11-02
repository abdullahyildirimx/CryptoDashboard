import { Input } from '@base-ui-components/react';
import { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (value) => {
		setSearchTerm(value);
    handleSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    handleSearch('');
  };

  return (
    <div className="relative">
      <Input
        id="searchBar"
        value={searchTerm}
        onValueChange={(value) => handleChange(value)}
        placeholder="Search"
        autoComplete="off"
        className="
          w-50 text-[12px] md:text-[14px]
          border border-border-grey rounded-[6px]
          py-1.5 pr-8 pl-3
          placeholder:text-neutral-400
          focus:border-blue-500
          focus:outline-none
          transition-all
        "
      />

      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="
            absolute top-1/2 right-[6px] -translate-y-1/2
            flex items-center justify-center
            h-[20px] w-[20px]
            rounded-full
            text-blue-500
          "
        >
          <i className="fa-solid fa-xmark text-[12px] md:text-[14px]" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;