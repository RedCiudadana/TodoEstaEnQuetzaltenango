import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { categories, municipalities } from '../../data/mockData';
import { BusinessFilters as BusinessFiltersType } from '../../types';

interface BusinessFiltersProps {
  filters: BusinessFiltersType;
  setFilters: (filters: BusinessFiltersType) => void;
}

const BusinessFilters: React.FC<BusinessFiltersProps> = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Close filters on window resize (mobile responsiveness)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center md:border-none">
        <h3 className="font-heading font-semibold text-gray-800">Filtros</h3>
        <button 
          onClick={toggleFilters}
          className="md:hidden text-gray-500 hover:text-accent-500"
          aria-label={isOpen ? "Ocultar filtros" : "Mostrar filtros"}
        >
          <Filter size={20} />
        </button>
      </div>
      
      {isOpen && (
        <div className="p-4">
          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Categoría</h4>
            <select 
              value={filters.categoria || ''}
              onChange={(e) => setFilters({ ...filters, categoria: e.target.value || undefined })}
              className="select"
              aria-label="Filter by category"
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Municipality Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Municipio</h4>
            <select 
              value={filters.municipio || ''}
              onChange={(e) => setFilters({ ...filters, municipio: e.target.value || undefined })}
              className="select"
              aria-label="Filter by municipality"
            >
              <option value="">Todos los municipios</option>
              {municipalities.map(municipality => (
                <option key={municipality.id} value={municipality.id}>
                  {municipality.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Reset Filters */}
          <button 
            onClick={() => setFilters({})}
            className="w-full btn btn-outline mt-2"
            aria-label="Reset filters"
          >
            Limpiar Filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default BusinessFilters;