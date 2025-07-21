import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { BusinessMarkdown } from '../../types';

interface BusinessListProps {
  businesses: BusinessMarkdown[];
}

const placeholderImg = 'https://placehold.co/400x250?text=Negocio';

const BusinessList: React.FC<BusinessListProps> = ({ businesses }) => {
  if (!businesses.length) {
    return <div className="text-center text-gray-500">No hay negocios para mostrar.</div>;
  }
  return (
    <div className="space-y-4">
      {businesses.map((business, idx) => (
        <div key={idx} className="card card-hover flex flex-col sm:flex-row">
          <div className="relative h-40 sm:h-auto sm:w-1/3 rounded-t-lg sm:rounded-t-none sm:rounded-l-lg overflow-hidden">
            <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-2">
              {business.categorias && business.categorias.length > 0 && business.categorias.map((cat, i) => (
                <span key={i} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium shadow">
                  {cat}
                </span>
              ))}
            </div>
            <img
              src={business.fotos && business.fotos.length > 0 ? business.fotos[0] : placeholderImg}
              alt={business.nombre}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="p-4 sm:w-2/3 flex flex-col">
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
            <div className="mt-auto flex flex-wrap items-center justify-between">
              <Link
                to={`/negocios/${encodeURIComponent(business.nombre)}`}
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