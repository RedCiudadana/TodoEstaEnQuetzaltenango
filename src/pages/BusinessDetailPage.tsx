import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Mail, Globe, Facebook, Instagram, Twitter, CreditCard, DollarSign, ArrowLeft } from 'lucide-react';
import { getBusinessesFromMarkdown } from '../data/loadBusinesses';
import type { BusinessMarkdown } from '../types';
import BusinessMap from '../components/map/BusinessMap';

const BusinessDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<BusinessMarkdown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  
  useEffect(() => {
    async function fetchBusiness() {
      try {
        setLoading(true);
        setError(null);
        const allBusinesses = await getBusinessesFromMarkdown();
        // Buscar por nombre o por un campo único (ajusta si tienes un slug o id único)
        const foundBusiness = allBusinesses.find(b => b.nombre === id);
        if (!foundBusiness) {
          throw new Error('Business not found');
        }
        setBusiness(foundBusiness);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching the business');
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchBusiness();
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-heading font-bold mb-4">Negocio no encontrado</h2>
          <p className="text-gray-600 mb-6">
            {error || 'El negocio que buscas no existe o ha sido eliminado.'}
          </p>
          <Link to="/negocios" className="btn btn-primary">
            Volver a Negocios
          </Link>
        </div>
      </div>
    );
  }
  
  // Helper to show payment methods
  const renderPaymentMethods = () => {
    return (
      <div className="flex flex-wrap gap-2">
        {business.pago_efectivo && (
          <span 
            key="efectivo" 
            className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
          >
            <DollarSign className="h-4 w-4" />
            <span className="ml-1">Efectivo</span>
          </span>
        )}
        {business.pago_tarjeta && (
          <span 
            key="tarjeta" 
            className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
          >
            <CreditCard className="h-4 w-4" />
            <span className="ml-1">Tarjeta</span>
          </span>
        )}
        {business.pago_transferencia && (
          <span 
            key="transferencia" 
            className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
          >
            <DollarSign className="h-4 w-4" />
            <span className="ml-1">Transferencia</span>
          </span>
        )}
      </div>
    );
  };
  
  return (
    <div>
      {/* Hero section with main photo */}
      <div className="relative h-80 bg-secondary-800">
        {business.fotos && business.fotos.length > 0 ? (
          <img 
            src={business.fotos[activePhoto]} 
            alt={business.nombre} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white text-lg font-bold">
            No hay fotos disponibles
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <div className="absolute bottom-0 w-full p-6">
          <div className="container mx-auto">
            <Link 
              to="/negocios" 
              className="inline-flex items-center text-white hover:text-accent-500 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Volver a Negocios</span>
            </Link>
            
            <div>
              {business.categorias && business.categorias.length > 0 && (
                <span className="inline-block bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {business.categorias[0]}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
                {business.nombre}
              </h1>
            </div>
          </div>
        </div>
      </div>
      
      {/* Thumbnail navigation */}
      {business.fotos && business.fotos.length > 1 && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {business.fotos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setActivePhoto(index)}
                  className={`flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border-2 ${
                    index === activePhoto ? 'border-primary-500' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={photo} 
                    alt={`${business.nombre} - Foto ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-heading font-semibold mb-4 text-gray-800">
                  Acerca de {business.nombre}
                </h2>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {business.descripcion}
                </p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-heading font-semibold mb-3 text-gray-800">
                    Métodos de Pago Aceptados
                  </h3>
                  
                  {renderPaymentMethods()}
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-heading font-semibold mb-4 text-gray-800">
                  Ubicación
                </h2>
                
                {/* <div className="h-[400px] rounded-lg overflow-hidden">
                  <BusinessMap businesses={[business]} />
                </div> */}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-gray-800">
                  Información de Contacto
                </h3>
                
                <div className="space-y-4">
                  {business.direccion && (
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-accent-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700">{business.direccion}</p>
                        {business.municipio && <p className="text-gray-500">{business.municipio}</p>}
                      </div>
                    </div>
                  )}
                  
                  {business.telefono && (
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-accent-500 mr-3 flex-shrink-0" />
                      <a 
                        href={`tel:${business.telefono}`} 
                        className="text-gray-700 hover:text-accent-500"
                      >
                        {business.telefono}
                      </a>
                    </div>
                  )}
                  
                  {business.correo_electronico && (
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-accent-500 mr-3 flex-shrink-0" />
                      <a 
                        href={`mailto:${business.correo_electronico}`} 
                        className="text-gray-700 hover:text-accent-500 break-all"
                      >
                        {business.correo_electronico}
                      </a>
                    </div>
                  )}
                  
                  {business.sitio_web && (
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-accent-500 mr-3 flex-shrink-0" />
                      <a 
                        href={business.sitio_web} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-700 hover:text-accent-500 break-all"
                      >
                        {business.sitio_web.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>
                
                {/* Social Networks */}
                {business.facebook && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-700 mb-3">Redes Sociales</h4>
                    <div className="flex space-x-3">
                      {business.facebook && (
                        <a 
                          href={business.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-accent-500 transition-colors"
                          aria-label="Facebook"
                        >
                          <Facebook size={20} />
                        </a>
                      )}
                      
                      {business.instagram && (
                        <a 
                          href={business.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:bg-accent-500 transition-colors"
                          aria-label="Instagram"
                        >
                          <Instagram size={20} />
                        </a>
                      )}
                      
                      {/* {business.redes_sociales.twitter && (
                        <a 
                          href={business.redes_sociales.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-accent-500 transition-colors"
                          aria-label="Twitter"
                        >
                          <Twitter size={20} />
                        </a>
                      )} */}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-gray-800 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-accent-500" />
                  Horario de Atención
                </h3>
                
                <div className="space-y-2">
                  {business.horario_lunes_viernes && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lunes a Viernes</span>
                      <span className="font-medium">{business.horario_lunes_viernes}</span>
                    </div>
                  )}
                  
                  {business.horario_sabado && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sábado</span>
                      <span className="font-medium">{business.horario_sabado}</span>
                    </div>
                  )}
                  
                  {business.horario_domingo && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Domingo</span>
                      <span className="font-medium">{business.horario_domingo}</span>
                    </div>
                  )}
                  
                  {!business.horario_domingo && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Domingo</span>
                      <span className="font-medium text-gray-500">Cerrado</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailPage;