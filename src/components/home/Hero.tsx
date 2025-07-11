import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const scrollToSearch = () => {
    const searchSection = document.querySelector('#search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative min-h-[80vh] bg-gradient-to-br from-secondary-700 via-secondary-800 to-secondary-900 flex items-center"
    >
      {/* Overlay with pattern */}
      <div 
        className="absolute inset-0 bg-opacity-30 bg-gradient-to-b from-black/40 to-black/10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Todo Está en <span className="text-accent-500">Quetzaltenango</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Descubre, conecta y apoya los negocios y emprendimientos locales de todos los municipios del departamento.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/negocios" className="btn btn-accent text-lg py-3 px-6">
              Explorar Negocios
            </Link>
            
            <Link to="/registrar" className="btn btn-outline border-white text-white hover:bg-white/10 text-lg py-3 px-6">
              Registrar mi Negocio
            </Link>
          </div>
          
          <button
            onClick={scrollToSearch}
            className="inline-flex items-center justify-center text-white hover:text-accent-500 transition-colors duration-200 animate-bounce"
            aria-label="Scroll down"
          >
            <ArrowDown className="h-10 w-10" />
          </button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute left-0 bottom-0 w-full h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
    </section>
  );
};

export default Hero;