import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

interface Municipality {
  id: string;
  name: string;
  image: string;
  description: string;
  businessCount: number;
}

// ...existing code...
const municipalities: Municipality[] = [
  {
    id: 'salcaja',
    name: 'Salcajá',
    image: 'https://images.pexels.com/photos/6192334/pexels-photo-6192334.jpeg',
    description: 'Cuna del rompope y rica tradición artesanal',
    businessCount: 12
  },
  {
    id: 'san-juan-ostuncalco',
    name: 'San Juan Ostuncalco',
    image: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg',
    description: 'Paisajes montañosos y cultura ancestral',
    businessCount: 7
  },
  {
    id: 'san-mateo',
    name: 'San Mateo',
    image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg',
    description: 'Tradición agrícola y comunidad acogedora',
    businessCount: 5
  },
  {
    id: 'sibilia',
    name: 'Sibilia',
    image: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg',
    description: 'Naturaleza, tranquilidad y producción agrícola',
    businessCount: 3
  },
  {
    id: 'quetzaltenango',
    name: 'Quetzaltenango',
    image: 'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png',
    description: 'La ciudad altense, centro económico y cultural del occidente',
    businessCount: 80
  },
  {
    id: 'olintepeque',
    name: 'Olintepeque',
    image: 'https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg',
    description: 'Tradición textil y hermosos paisajes montañosos',
    businessCount: 4
  },
  {
    id: 'la-esperanza',
    name: 'La Esperanza',
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
    description: 'Crecimiento urbano y vida tranquila',
    businessCount: 9
  }
];

const MunicipalitiesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Explora los Municipios de Quetzaltenango
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre la riqueza comercial y cultural de cada uno de los municipios 
            que conforman nuestro hermoso departamento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {municipalities.map((municipality) => (
            <Link
              key={municipality.id}
              to={`/negocios?municipio=${municipality.id}`}
              className="group relative overflow-hidden rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-64">
                <img
                  src={municipality.image}
                  alt={municipality.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Business count badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                  <MapPin className="h-3 w-3 text-accent-500 mr-1" />
                  <span className="text-xs font-medium text-gray-700">
                    {municipality.businessCount} negocios
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                  {municipality.name}
                </h3>
                <p className="text-white/90 text-sm mb-3 line-clamp-2">
                  {municipality.description}
                </p>
                <div className="flex items-center text-accent-400 font-medium text-sm">
                  <span>Explorar negocios</span>
                  <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/negocios"
            className="inline-flex items-center btn btn-primary text-lg px-8 py-3"
          >
            <MapPin className="h-5 w-5 mr-2" />
            <span>Ver Todos los Negocios</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MunicipalitiesSection;