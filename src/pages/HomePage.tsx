import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ShoppingBag, ArrowRight, Smartphone } from 'lucide-react';
import HeroSlider from '../components/home/HeroSlider';
import SearchBar from '../components/search/SearchBar';
import CategoryList from '../components/home/CategoryList';
import FeaturedBusinesses from '../components/home/FeaturedBusinesses';
import EventsPreview from '../components/home/EventsPreview';
import RegisterCTA from '../components/home/RegisterCTA';
import MunicipalitiesSection from '../components/home/MunicipalitiesSection';
import { useBusinesses } from '../hooks/useBusinesses';
import { events } from '../data/mockData';
import Logo1 from '../assets/images/logos/TEQ-06.png';
import Logo2 from '../assets/images/logos/TEQ-07.png';
import Logo3 from '../assets/images/logos/TEQ-08.png';

const HomePage: React.FC = () => {
  const { businesses, loading, error } = useBusinesses();
  // Selección de negocios destacados (puedes ajustar la lógica)
  const featuredBusinesses = businesses.slice(0, 3);
  const upcomingEvents = events.slice(0, 2);

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />
      
      {/* Search Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 mb-2">
                Encuentra lo que buscas
              </h2>
              <p className="text-gray-600">
                Descubre los negocios y servicios de Quetzaltenango
              </p>
            </div>
            <SearchBar placeholder="Buscar por nombre, categoría o municipio..." />
            
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/negocios" className="btn btn-outline">
                <MapPin className="h-4 w-4" />
                <span>Ver Negocios</span>
              </Link>
              <Link to="/eventos" className="btn btn-outline">
                <Calendar className="h-4 w-4" />
                <span>Ver Eventos</span>
              </Link>
              {/* <Link to="/diagnostico-digital" className="btn btn-accent">
                <Smartphone className="h-4 w-4" />
                <span>Diagnóstico Digital</span>
              </Link> */}
              <Link to="/business/register" className="btn btn-accent">
                <ShoppingBag className="h-4 w-4" />
                <span>Registra tu Negocio</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 mb-2">
              Explora por Categorías
            </h2>
            <p className="text-gray-600">
              Encuentra negocios según tus necesidades
            </p>
          </div>
          
          <CategoryList />
          
          <div className="text-center mt-8">
            <Link 
              to="/negocios" 
              className="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-medium"
            >
              <span>Ver todas las categorías</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Digital Diagnostic CTA */}
      {/* <section className="py-12 bg-gradient-to-br from-secondary-500 to-secondary-700 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              ¿Qué tan digital es tu negocio?
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Descubre el nivel de madurez digital de tu negocio con nuestro diagnóstico gratuito 
              y obtén recomendaciones personalizadas para crecer en el mundo digital.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/diagnostico-digital" className="btn btn-accent text-lg py-3 px-6">
                <Smartphone className="h-5 w-5" />
                <span>Realizar Diagnóstico</span>
              </Link>
              
              <a 
                href="https://conectafuturo.redciudadana.org" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline border-white text-white hover:bg-white/10 text-lg py-3 px-6"
              >
                Ver Cursos Conecta Futuro
              </a>
            </div>
          </div>
        </div>
      </section> */}

      {/* Municipalities Section */}
      <MunicipalitiesSection />
      
      {/* Featured Businesses */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 mb-2">
                Negocios Destacados
              </h2>
              <p className="text-gray-600">
                Conoce algunos de los mejores negocios de Quetzaltenango
              </p>
            </div>
            
            <Link 
              to="/negocios" 
              className="hidden md:inline-flex items-center text-secondary-600 hover:text-secondary-700 font-medium"
            >
              <span>Ver todos</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <p>Error al cargar los negocios: {error}</p>
            </div>
          ) : (
            <FeaturedBusinesses businesses={featuredBusinesses} />
          )}
          
          <div className="text-center mt-8 md:hidden">
            <Link 
              to="/negocios" 
              className="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-medium"
            >
              <span>Ver todos los negocios</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 mb-2">
                Próximos Eventos
              </h2>
              <p className="text-gray-600">
                No te pierdas las ferias y eventos en Quetzaltenango
              </p>
            </div>
            
            <Link 
              to="/eventos" 
              className="hidden md:inline-flex items-center text-secondary-600 hover:text-secondary-700 font-medium"
            >
              <span>Ver todos</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <EventsPreview events={upcomingEvents} />
          
          <div className="text-center mt-8 md:hidden">
            <Link 
              to="/eventos" 
              className="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-medium"
            >
              <span>Ver todos los eventos</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Register Business CTA */}
      <RegisterCTA />

      {/* Partners Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 mb-2">
              Un Proyecto de
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <a 
              href="https://www.metropolidelosaltos.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src={Logo3} 
                alt="Mancomunidad de los Altos" 
                className="h-20 w-auto object-contain"
              />
            </a>
            <a 
              href="https://www.redciudadana.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src={Logo1}
                alt="Red Ciudadana" 
                className="h-20 w-auto object-contain"
              />
            </a>
            <a 
              href="https://escuela.redciudadana.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src={Logo2}
                alt="Conecta Futuro" 
                className="h-20 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;