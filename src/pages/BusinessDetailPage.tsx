import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Mail, Globe, Facebook, Instagram, Twitter, CreditCard, DollarSign, ArrowLeft } from 'lucide-react';
import { businesses } from '../data/mockData';
import { Business } from '../types';
import BusinessMap from '../components/map/BusinessMap';

const BusinessDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  
  useEffect(() => {
    async function fetchBusiness() {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const foundBusiness = businesses.find(b => b.id === id);

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
        {business.paymentMethods.map((method, index) => {
          let icon;
          switch (method.toLowerCase()) {
            case 'efectivo':
              icon = <DollarSign className="h-4 w-4" />;
              break;
            case 'tarjeta':
              icon = <CreditCard className="h-4 w-4" />;
              break;
            default:
              icon = <DollarSign className="h-4 w-4" />;
          }
          
          return (
            <span 
              key={index} 
              className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
            >
              {icon}
              <span className="ml-1">{method}</span>
            </span>
          );
        })}
      </div>
    );
  };
  
  return (
    <div>
      {/* Hero section with main photo */}
      <div className="relative h-80 bg-secondary-800">
        <img 
          src={business.photos[activePhoto]} 
          alt={business.name} 
          className="w-full h-full object-cover"
        />
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
              <span className="inline-block bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                {business.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
                {business.name}
              </h1>
            </div>
          </div>
        </div>
      </div>
      
      {/* Thumbnail navigation */}
      {business.photos.length > 1 && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {business.photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setActivePhoto(index)}
                  className={`flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border-2 ${
                    index === activePhoto ? 'border-primary-500' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={photo} 
                    alt={`${business.name} - Foto ${index + 1}`}
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
                  Acerca de {business.name}
                </h2>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {business.description}
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
                
                <div className="h-[400px] rounded-lg overflow-hidden">
                  <BusinessMap businesses={[business]} />
                </div>
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
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">{business.address}</p>
                      <p className="text-gray-500">{business.municipality}</p>
                    </div>
                  </div>
                  
                  {business.phone && (
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                      <a 
                        href={`tel:${business.phone}`} 
                        className="text-gray-700 hover:text-primary-600"
                      >
                        {business.phone}
                      </a>
                    </div>
                  )}
                  
                  {business.email && (
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                      <a 
                        href={`mailto:${business.email}`} 
                        className="text-gray-700 hover:text-primary-600 break-all"
                      >
                        {business.email}
                      </a>
                    </div>
                  )}
                  
                  {business.website && (
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                      <a 
                        href={business.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-700 hover:text-primary-600 break-all"
                      >
                        {business.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>
                
                {/* Social Networks */}
                {business.socialNetworks && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-700 mb-3">Redes Sociales</h4>
                    <div className="flex space-x-3">
                      {business.socialNetworks.facebook && (
                        <a 
                          href={business.socialNetworks.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary-600 transition-colors"
                          aria-label="Facebook"
                        >
                          <Facebook size={20} />
                        </a>
                      )}
                      
                      {business.socialNetworks.instagram && (
                        <a 
                          href={business.socialNetworks.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary-600 transition-colors"
                          aria-label="Instagram"
                        >
                          <Instagram size={20} />
                        </a>
                      )}
                      
                      {business.socialNetworks.twitter && (
                        <a 
                          href={business.socialNetworks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary-600 transition-colors"
                          aria-label="Twitter"
                        >
                          <Twitter size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-gray-800 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary-500" />
                  Horario de Atención
                </h3>
                
                <div className="space-y-2">
                  {business.operatingHours.monday && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lunes</span>
                      <span className="font-medium">{business.operatingHours.monday}</span>
                    </div>
                  )}
                  
                  {business.operatingHours.tuesday && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Martes</span>
                      <span className="font-medium">{business.operatingHours.tuesday}</span>
                    </div>
                  )}
                  
                  {business.operatingHours.wednesday && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Miércoles</span>
                      <span className="font-medium">{business.operatingHours.wednesday}</span>
                    </div>
                  )}
                  
                  {business.operatingHours.thursday && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jueves</span>
                      <span className="font-medium">{business.operatingHours.thursday}</span>
                    </div>
                  )}
                  
                  {business.operatingHours.friday && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Viernes</span>
                      <span className="font-medium">{business.operatingHours.friday}</span>
                    </div>
                  )}
                  
                  {business.operatingHours.saturday && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sábado</span>
                      <span className="font-medium">{business.operatingHours.saturday}</span>
                    </div>
                  )}
                  
                  {business.operatingHours.sunday && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Domingo</span>
                      <span className="font-medium">{business.operatingHours.sunday}</span>
                    </div>
                  )}
                  
                  {!business.operatingHours.sunday && (
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