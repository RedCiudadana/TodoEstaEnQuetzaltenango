import React from 'react';
import { Users, MapPin, Calendar, Target, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';

const AboutPage: React.FC = () => {
  return (
    <>
      <PageHeader 
        title="Acerca de Todo Está en Quetzaltenango"
        subtitle="Una plataforma dedicada a visibilizar, promover y conectar los comercios y emprendimientos locales"
        image="https://images.pexels.com/photos/2129796/pexels-photo-2129796.png"
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-heading font-semibold text-gray-800">
                Nuestra Misión
              </h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              Impulsar la economía local de Quetzaltenango facilitando la conexión directa 
              entre los negocios locales y los habitantes del departamento, promoviendo el 
              comercio justo y el consumo consciente dentro de nuestra comunidad.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center mb-4">
              <div className="bg-secondary-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <ThumbsUp className="h-6 w-6 text-secondary-600" />
              </div>
              <h2 className="text-2xl font-heading font-semibold text-gray-800">
                Nuestra Visión
              </h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              Ser la principal plataforma de referencia para descubrir y apoyar 
              a los negocios locales de Quetzaltenango, fomentando una red económica 
              robusta que fortalezca la identidad cultural y comercial del departamento.
            </p>
          </div>
        </div>
        
        {/* What We Do */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-2">
              ¿Qué Hacemos?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Trabajamos para crear conexiones significativas entre los negocios 
              locales y la comunidad de Quetzaltenango.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
              <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-success-600" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-2">
                Visibilizamos
              </h3>
              <p className="text-gray-600">
                Damos a conocer los diversos negocios y emprendimientos que existen en 
                los municipios de Quetzaltenango, ayudándolos a ser descubiertos.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-2">
                Promovemos
              </h3>
              <p className="text-gray-600">
                Difundimos eventos, ferias y actividades que impulsan el comercio local 
                y la cultura de nuestro departamento.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-2">
                Conectamos
              </h3>
              <p className="text-gray-600">
                Creamos puentes entre comerciantes y consumidores, permitiendo 
                una relación más directa y beneficiosa para ambas partes.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-2">
              Nuestro Equipo
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Somos un equipo comprometido con el desarrollo económico y social de Quetzaltenango.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <p className="text-center text-gray-700 mb-6">
              Todo Está en Quetzaltenango es una iniciativa colaborativa respaldada por:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <div className="font-heading font-bold text-xl mb-2 text-gray-800">
                  Municipalidades Participantes
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Municipalidad de Quetzaltenango</li>
                  <li>Municipalidad de Salcajá</li>
                  <li>Municipalidad de Cantel</li>
                  <li>Municipalidad de Almolonga</li>
                  <li>Municipalidad de Zunil</li>
                </ul>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="font-heading font-bold text-xl mb-2 text-gray-800">
                  Cámaras y Asociaciones
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Cámara de Comercio de Quetzaltenango</li>
                  <li>Asociación de Emprendedores Xelajú</li>
                  <li>Cooperativa de Artesanos del Occidente</li>
                  <li>Red de Turismo Sostenible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact & Get Involved */}
        <div className="bg-gray-50 rounded-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-2">
              Sé Parte del Proyecto
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hay muchas formas de apoyar esta iniciativa y contribuir al desarrollo 
              económico de nuestro departamento.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-4">
                ¿Tienes un Negocio?
              </h3>
              <p className="text-gray-600 mb-6">
                Registra tu negocio gratuitamente en nuestra plataforma y 
                forma parte de nuestra red de comercios locales.
              </p>
              <Link to="/registrar" className="btn btn-primary">
                Registrar mi Negocio
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-4">
                ¿Quieres Contactarnos?
              </h3>
              <p className="text-gray-600 mb-6">
                Si tienes preguntas, sugerencias o propuestas de colaboración, 
                no dudes en comunicarte con nosotros.
              </p>
              <a href="mailto:contacto@todoestaquetzaltenango.com" className="btn btn-secondary">
                Enviar Mensaje
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;