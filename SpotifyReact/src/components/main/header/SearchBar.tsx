import React, { useState } from 'react';

interface ISearchProps {
  className?: string
}

const SearchBar: React.FC<ISearchProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
  };

  return (
    <div className={className}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
        className="bg-transparent border-0 font-roboto font-normal text-base text-white w-full focus:ring-0"
      />
    </div>
  );
};

export default SearchBar;