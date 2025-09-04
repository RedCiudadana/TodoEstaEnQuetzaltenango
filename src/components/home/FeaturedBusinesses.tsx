import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { BusinessMarkdown } from '../../types';
import { getBusinessMainImage } from '../../lib/imageUtils';

interface FeaturedBusinessesProps {
  businesses: BusinessMarkdown[];
}


const FeaturedBusinesses: React.FC<FeaturedBusinessesProps> = ({ businesses }) => {
  if (!businesses.length) {
    return <div className="text-center text-gray-500">No hay negocios destacados.</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business, idx) => (
        <div key={idx} className="card card-hover h-full flex flex-col">
          <div className="relative h-48 rounded-t-lg overflow-hidden aspect-[1.6/1]">
            <img
              src={getBusinessMainImage(business.fotos, 400, 250)}
              alt={business.nombre}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {business.categorias && business.categorias.length > 0 && (
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                {business.categorias[0]}
              </div>
            )}
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800">
              {business.nombre}
            </h3>
            <div className="flex items-start mb-2">
              <MapPin className="h-4 w-4 text-accent-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-gray-600 text-sm">{business.direccion}</p>
                <p className="text-gray-500 text-sm">{business.municipio}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {business.descripcion}
            </p>
            <div className="mt-auto">
              <Link
                to={`/negocios/${encodeURIComponent(business.nombre)}`}
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