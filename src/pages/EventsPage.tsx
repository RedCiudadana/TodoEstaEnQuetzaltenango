import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { events, municipalities } from '../data/mockData';
import { Event, EventFilters } from '../types';
import SearchBar from '../components/search/SearchBar';

const EventsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const initialFilters: EventFilters = {
    name: searchParams.get('q') || undefined,
    category: searchParams.get('categoria') || undefined,
    municipality: searchParams.get('municipio') || undefined,
    dateFrom: searchParams.get('desde') || undefined,
    dateTo: searchParams.get('hasta') || undefined,
  };
  
  const [filters, setFilters] = useState<EventFilters>(initialFilters);
  
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.name) params.set('q', filters.name);
    if (filters.category) params.set('categoria', filters.category);
    if (filters.municipality) params.set('municipio', filters.municipality);
    if (filters.dateFrom) params.set('desde', filters.dateFrom);
    if (filters.dateTo) params.set('hasta', filters.dateTo);
    
    setSearchParams(params);
    
    filterEvents();
  }, [filters]);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsFiltersOpen(true);
      } else {
        setIsFiltersOpen(false);
      }
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const filterEvents = () => {
    let result = [...events];
    
    if (filters.name) {
      const searchTerm = filters.name.toLowerCase();
      result = result.filter(event => 
        event.name.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.category) {
      result = result.filter(event => 
        event.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }
    
    if (filters.municipality) {
      result = result.filter(event => 
        event.municipality.toLowerCase() === filters.municipality?.toLowerCase()
      );
    }
    
    if (filters.dateFrom) {
      result = result.filter(event => 
        new Date(event.date) >= new Date(filters.dateFrom!)
      );
    }
    
    if (filters.dateTo) {
      result = result.filter(event => 
        new Date(event.date) <= new Date(filters.dateTo!)
      );
    }
    
    setFilteredEvents(result);
  };
  
  const handleSearch = (query: string) => {
    setFilters({
      ...filters,
      name: query
    });
  };
  
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  return (
    <>
      <PageHeader 
        title="Eventos y Ferias"
        subtitle="Descubre los próximos eventos en Quetzaltenango"
        image="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <SearchBar 
            placeholder="Buscar eventos..." 
            defaultValue={filters.name || ''}
            onSearch={handleSearch}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center md:border-none">
                <h3 className="font-heading font-semibold text-gray-800">Filtros</h3>
                <button 
                  onClick={toggleFilters}
                  className="md:hidden text-gray-500 hover:text-primary-500"
                  aria-label={isFiltersOpen ? "Ocultar filtros" : "Mostrar filtros"}
                >
                  <Filter size={20} />
                </button>
              </div>
              
              {isFiltersOpen && (
                <div className="p-4">
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">Categoría</h4>
                    <select 
                      value={filters.category || ''}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })}
                      className="select"
                      aria-label="Filter by category"
                    >
                      <option value="">Todas las categorías</option>
                      <option value="cultural">Cultural</option>
                      <option value="artesanal">Artesanal</option>
                      <option value="gastronomia">Gastronomía</option>
                      <option value="educativo">Educativo</option>
                      <option value="agricultura">Agricultura</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">Municipio</h4>
                    <select 
                      value={filters.municipality || ''}
                      onChange={(e) => setFilters({ ...filters, municipality: e.target.value || undefined })}
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
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">Fecha Desde</h4>
                    <input 
                      type="date" 
                      value={filters.dateFrom || ''}
                      onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value || undefined })}
                      className="input"
                      aria-label="Filter by start date"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">Fecha Hasta</h4>
                    <input 
                      type="date" 
                      value={filters.dateTo || ''}
                      onChange={(e) => setFilters({ ...filters, dateTo: e.target.value || undefined })}
                      className="input"
                      aria-label="Filter by end date"
                    />
                  </div>
                  
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
            
            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start">
                <CalendarIcon className="h-5 w-5 text-primary-500 mt-0.5 mr-2" />
                <div>
                  <p className="text-gray-700 font-medium">
                    {filteredEvents.length} {filteredEvents.length === 1 ? 'evento encontrado' : 'eventos encontrados'}
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
            {filteredEvents.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No se encontraron eventos</h3>
                <p className="text-gray-600 mb-4">
                  No hay eventos que coincidan con los criterios de búsqueda. Intente modificar los filtros.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredEvents.map(event => (
                  <div key={event.id} className="card card-hover overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <img 
                          src={event.photo} 
                          alt={event.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-primary-500 text-white px-3 py-1 text-sm font-medium">
                          {formatDate(event.date)}
                        </div>
                      </div>
                      
                      <div className="p-6 md:w-2/3">
                        <div className="flex flex-wrap justify-between items-start mb-3">
                          <div>
                            <span className="inline-block bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full text-xs font-medium mb-2">
                              {event.category}
                            </span>
                            <h2 className="text-2xl font-heading font-bold text-gray-800">
                              {event.name}
                            </h2>
                          </div>
                          
                          <div className="text-right mt-1">
                            <p className="text-sm text-gray-500">{event.municipality}</p>
                            <p className="text-sm font-medium text-gray-800">{event.startTime} {event.endTime ? `- ${event.endTime}` : ''}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">
                          {event.description}
                        </p>
                        
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Organiza:</span> {event.organizer}
                          </div>
                          
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Lugar:</span> {event.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;