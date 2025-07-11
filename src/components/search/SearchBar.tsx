import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Buscar...", 
  defaultValue = "",
  onSearch 
}) => {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(query);
    } else {
      // Default behavior if no onSearch provided
      navigate(`/negocios?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      id="search-section"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-grow py-3 px-4 focus:outline-none text-gray-700"
        aria-label="Search query"
      />
      <button
        type="submit"
        className="bg-primary-500 hover:bg-primary-600 text-white px-5 flex items-center justify-center transition-colors"
        aria-label="Search"
      >
        <Search size={20} />
        <span className="ml-2 hidden md:inline">Buscar</span>
      </button>
    </form>
  );
};

export default SearchBar;