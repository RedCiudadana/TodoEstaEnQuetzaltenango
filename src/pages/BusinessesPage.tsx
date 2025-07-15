import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, List, Map as MapIcon } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/search/SearchBar';
import BusinessFilters from '../components/business/BusinessFilters';
import BusinessList from '../components/business/BusinessList';
import BusinessMap from '../components/map/BusinessMap';
import { useBusinesses } from '../hooks/useBusinesses';
import { BusinessFilters as BusinessFiltersType } from '../types';

const BusinessesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<'list' | 'map'>('list');
  
  const initialFilters: BusinessFiltersType = {
    name: searchParams.get('q') || undefined,
    category: searchParams.get('categoria') || undefined,
    municipality: searchParams.get('municipio') || undefined,
  };
  
  const [filters, setFilters] = useState<BusinessFiltersType>(initialFilters);
  const { businesses: filteredBusinesses, loading, error } = useBusinesses(filters);
  
  const handleSearch = (query: string) => {
    setFilters({
      ...filters,
      name: query
    });
    
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  };
  
  const toggleView = (newView: 'list' | 'map') => {
    setView(newView);
  };
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <PageHeader 
        title="Negocios en Quetzaltenango"
        subtitle="Explora los negocios y servicios de nuestro departamento"
        image="https://images.pexels.com/photos/2129796/pexels-photo-2129796.png"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-800 mb-2">
              Negocios en Quetzaltenango
            </h1>
            <p className="text-gray-600">
              Explora los negocios y servicios de nuestro departamento
            </p>
          </div>
          
          <div className="flex justify-center bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleView('list')}
              className={`px-4 py-2 flex items-center gap-2 ${
                view === 'list' 
                  ? 'bg-accent-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              aria-label="Ver como lista"
              aria-pressed={view === 'list'}
            >
              <List size={18} />
              <span>Lista</span>
            </button>
            
            <button
              onClick={() => toggleView('map')}
              className={`px-4 py-2 flex items-center gap-2 ${
                view === 'map' 
                  ? 'bg-accent-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              aria-label="Ver como mapa"
              aria-pressed={view === 'map'}
            >
              <MapIcon size={18} />
              <span>Mapa</span>
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <SearchBar 
            placeholder="Buscar negocios..." 
            defaultValue={filters.name || ''}
            onSearch={handleSearch}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <BusinessFilters 
              filters={filters} 
              setFilters={setFilters} 
            />
            
            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-accent-500 mt-0.5 mr-2" />
                <div>
                  <p className="text-gray-700 font-medium">
                    {loading ? (
                      <span>Cargando...</span>
                    ) : (
                      <span>
                        {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'negocio encontrado' : 'negocios encontrados'}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    {filters.municipality 
                      ? `en ${filters.municipality}` 
                      : 'en todo Quetzaltenango'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : view === 'list' ? (
              <BusinessList businesses={filteredBusinesses} />
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-[70vh]">
                <BusinessMap businesses={filteredBusinesses} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessesPage;