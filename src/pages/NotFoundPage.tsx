import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Store } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="text-accent-500 mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-24 h-24 mx-auto"
          >
            <path 
              fillRule="evenodd" 
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        
        <h1 className="text-4xl font-heading font-bold text-gray-800 mb-4">
          Página no encontrada
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/" className="btn btn-primary flex items-center justify-center">
            <Home className="mr-2 h-5 w-5" />
            <span>Inicio</span>
          </Link>
          
          <Link to="/negocios" className="btn btn-outline flex items-center justify-center">
            <Store className="mr-2 h-5 w-5" />
            <span>Negocios</span>
          </Link>
          
          <Link to="/" className="btn btn-outline flex items-center justify-center">
            <Search className="mr-2 h-5 w-5" />
            <span>Buscar</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;