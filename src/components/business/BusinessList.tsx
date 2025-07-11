import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Phone, Mail } from 'lucide-react';
import { Business } from '../../types';

interface BusinessListProps {
  businesses: Business[];
}

const BusinessList: React.FC<BusinessListProps> = ({ businesses }) => {
  if (businesses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">No se encontraron negocios</h3>
        <p className="text-gray-600 mb-4">
          No hay negocios que coincidan con los criterios de búsqueda. Intente modificar los filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {businesses.map((business) => (
        <div key={business.id} className="card card-hover flex flex-col sm:flex-row">
          <div className="relative h-40 sm:h-auto sm:w-1/3 rounded-t-lg sm:rounded-t-none sm:rounded-l-lg overflow-hidden">
            <img 
              src={business.photos[0]} 
              alt={business.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
              {business.category}
            </div>
          </div>
          
          <div className="p-4 sm:w-2/3 flex flex-col">
            <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800">
              {business.name}
            </h3>
            
            <div className="flex items-start mb-2">
              <MapPin className="h-4 w-4 text-primary-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-gray-600 text-sm">{business.address}</p>
                <p className="text-gray-500 text-sm">{business.municipality}</p>
              </div>
            </div>
            
            <div className="flex items-start mb-3">
              <Clock className="h-4 w-4 text-primary-500 mt-1 mr-2 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                {business.operatingHours.monday ? `Lun-Vie: ${business.operatingHours.monday}` : 'Cerrado los lunes'}
                <br />
                {business.operatingHours.saturday ? `Sáb: ${business.operatingHours.saturday}` : 'Cerrado los sábados'}
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">
              {business.description}
            </p>
            
            <div className="mt-auto flex flex-wrap items-center justify-between">
              <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
                {business.phone && (
                  <a 
                    href={`tel:${business.phone}`} 
                    className="inline-flex items-center text-gray-600 hover:text-primary-600 text-sm"
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    <span>Llamar</span>
                  </a>
                )}
                
                {business.email && (
                  <a 
                    href={`mailto:${business.email}`} 
                    className="inline-flex items-center text-gray-600 hover:text-primary-600 text-sm"
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    <span>Email</span>
                  </a>
                )}
              </div>
              
              <Link
                to={`/negocios/${business.id}`}
                className="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-medium text-sm"
              >
                <span>Ver detalles</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusinessList;