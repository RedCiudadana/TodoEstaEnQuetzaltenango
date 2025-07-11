import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Business } from '../../types';

interface FeaturedBusinessesProps {
  businesses: Business[];
}

const FeaturedBusinesses: React.FC<FeaturedBusinessesProps> = ({ businesses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business) => (
        <div key={business.id} className="card card-hover h-full flex flex-col">
          <div className="relative h-48 rounded-t-lg overflow-hidden">
            <img 
              src={business.photos[0]} 
              alt={business.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
              {business.category}
            </div>
          </div>
          
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800">
              {business.name}
            </h3>
            
            <div className="flex items-start mb-3">
              <MapPin className="h-4 w-4 text-primary-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-gray-600 text-sm">{business.address}</p>
                <p className="text-gray-500 text-sm">{business.municipality}</p>
              </div>
            </div>
            
            <div className="flex items-start mb-4">
              <Clock className="h-4 w-4 text-primary-500 mt-1 mr-2 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                {business.operatingHours.monday ? `Lun-Vie: ${business.operatingHours.monday}` : 'Cerrado los lunes'}
                <br />
                {business.operatingHours.saturday ? `Sáb: ${business.operatingHours.saturday}` : 'Cerrado los sábados'}
                <br />
                {business.operatingHours.sunday ? `Dom: ${business.operatingHours.sunday}` : 'Cerrado los domingos'}
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {business.description}
            </p>
            
            <div className="mt-auto">
              <Link
                to={`/negocios/${business.id}`}
                className="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-medium"
              >
                <span>Ver más detalles</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedBusinesses;