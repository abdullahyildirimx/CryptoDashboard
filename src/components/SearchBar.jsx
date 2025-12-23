import { Button, Input } from '@base-ui/react'
import { useState } from 'react'

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (value) => {
    setSearchTerm(value)
    handleSearch(value)
  }

  const handleClear = () => {
    setSearchTerm('')
    handleSearch('')
  }

  return (
    <div className="relative">
      <Input
        id="searchBar"
        value={searchTerm}
        onValueChange={(value) => handleChange(value)}
        placeholder="Search"
        autoComplete="off"
        className={`
          w-200 text-[12px] md:text-[14px]
          border rounded-md
          py-6 pr-8 pl-12
          placeholder:text-neutral-400
          border-grey2 hover:border-blue-500 focus:border-blue-500
          focus:outline-none
          transition-all duration-150 ease-in-out
        `}
      />

      {searchTerm && (
        <Button
          onClick={handleClear}
          className="
            absolute top-1/2 right-6 -translate-y-1/2
            flex items-center justify-center
            h-20 w-20
            rounded-full
            text-grey1 hover:text-blue-500
          "
        >
          <i className="fa-solid fa-xmark text-[10px] md:text-[12px]" />
        </Button>
      )}
    </div>
  )
}

export default SearchBar
