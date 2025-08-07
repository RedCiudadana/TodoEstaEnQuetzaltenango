import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, MapPin, Clock, Phone, Mail, Globe, Facebook, Instagram, Camera, X, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import { categories, municipalities } from '../../data/mockData';

interface BusinessFormData {
  name: string;
  category: string;
  municipality: string;
  address: string;
  locationUrl: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  paymentMethods: string[];
  operatingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  socialNetworks: {
    facebook: string;
    instagram: string;
  };
  photos: string[];
}

const RegisterBusinessPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BusinessFormData>({
    name: '',
    category: '',
    municipality: '',
    address: '',
    locationUrl: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    paymentMethods: [],
    operatingHours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    },
    socialNetworks: {
      facebook: '',
      instagram: '',
    },
    photos: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter(m => m !== method)
        : [...prev.paymentMethods, method]
    }));
  };

  const handleOperatingHoursChange = (day: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: value
      }
    }));
  };

  const handleSocialNetworkChange = (network: 'facebook' | 'instagram', value: string) => {
    setFormData(prev => ({
      ...prev,
      socialNetworks: {
        ...prev.socialNetworks,
        [network]: value
      }
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = [...photos];
    
    for (let i = 0; i < files.length; i++) {
      if (newPhotos.length >= 5) break;
      
      const file = files[i];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        newPhotos.push(reader.result as string);
        setPhotos([...newPhotos]);
        setFormData(prev => ({
          ...prev,
          photos: newPhotos
        }));
      };
      
      reader.readAsDataURL(file);
    }
  };

  const MAX_PHOTO_URL_LENGTH = 350;

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      photos: photos.filter(url => url)
    }));
  }, [photos]);

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwaTMF1VlLSlH-pLaUlmSiQmmMSEMllyyvOoWNPxAAV09rqBS7ClcG7uwyV3sE630mWPw/exec';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append('timestamp', new Date().toISOString());
      params.append('name', formData.name);
      params.append('category', formData.category);
      params.append('municipality', formData.municipality);
      params.append('address', formData.address);
      params.append('locationUrl', formData.locationUrl);
      params.append('description', formData.description);
      params.append('phone', formData.phone);
      params.append('email', formData.email);
      params.append('website', formData.website);
      params.append('paymentMethods', formData.paymentMethods.join(', '));
      params.append('operatingHours_monday', formData.operatingHours.monday);
      params.append('operatingHours_saturday', formData.operatingHours.saturday);
      params.append('operatingHours_sunday', formData.operatingHours.sunday);
      params.append('facebook', formData.socialNetworks.facebook);
      params.append('instagram', formData.socialNetworks.instagram);
      params.append('photos', formData.photos.join(','));

      const response = await fetch(`${SCRIPT_URL}?${params.toString()}`, {
        method: 'GET',
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();

      if (json.success) {
        navigate('/business/register/success');
      } else {
        setError(json.error || 'Ocurrió un error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Ocurrió un error al enviar el formulario. Por favor, intenta de nuevo.');
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre del Negocio *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 input"
            placeholder="Ej. Café del Centro"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Categoría *
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 select"
          >
            <option value="">Seleccionar categoría</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="municipality" className="block text-sm font-medium text-gray-700">
            Municipio *
          </label>
          <select
            id="municipality"
            name="municipality"
            required
            value={formData.municipality}
            onChange={handleInputChange}
            className="mt-1 select"
          >
            <option value="">Seleccionar municipio</option>
            {municipalities.map(municipality => (
              <option key={municipality.id} value={municipality.id}>
                {municipality.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Dirección *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 input"
            placeholder="Ej. 4ta Calle 8-24 Zona 1"
          />
        </div>

        <div>
          <label htmlFor="locationUrl" className="block text-sm font-medium text-gray-700">
            Enlace de Ubicación (Google Maps) *
          </label>
          <input
            type="url"
            id="locationUrl"
            name="locationUrl"
            required
            value={formData.locationUrl}
            onChange={handleInputChange}
            className="mt-1 input"
            placeholder="Pega aquí el enlace de Google Maps"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción del Negocio *
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 input"
            placeholder="Describe tu negocio, productos o servicios..."
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className="btn btn-primary"
        >
          Siguiente
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Teléfono *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 input"
            placeholder="Ej. +502 7765-4321"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo Electrónico *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 input"
            placeholder="Ej. contacto@minegocio.com"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">
            Sitio Web
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="mt-1 input"
            placeholder="Ej. https://www.minegocio.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Métodos de Pago *
          </label>
          <div className="space-y-2">
            {['Efectivo', 'Tarjeta', 'Transferencia'].map(method => (
              <label key={method} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.paymentMethods.includes(method)}
                  onChange={() => handlePaymentMethodChange(method)}
                  className="mr-2"
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="btn btn-outline"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="btn btn-primary"
        >
          Siguiente
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Horario de Atención</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="monday" className="block text-sm font-medium text-gray-700">
              Lunes a Viernes
            </label>
            <input
              type="text"
              id="monday"
              value={formData.operatingHours.monday}
              onChange={(e) => handleOperatingHoursChange('monday', e.target.value)}
              className="mt-1 input"
              placeholder="Ej. 8:00 - 17:00"
            />
          </div>

          <div>
            <label htmlFor="saturday" className="block text-sm font-medium text-gray-700">
              Sábado
            </label>
            <input
              type="text"
              id="saturday"
              value={formData.operatingHours.saturday}
              onChange={(e) => handleOperatingHoursChange('saturday', e.target.value)}
              className="mt-1 input"
              placeholder="Ej. 8:00 - 13:00"
            />
          </div>

          <div>
            <label htmlFor="sunday" className="block text-sm font-medium text-gray-700">
              Domingo
            </label>
            <input
              type="text"
              id="sunday"
              value={formData.operatingHours.sunday}
              onChange={(e) => handleOperatingHoursChange('sunday', e.target.value)}
              className="mt-1 input"
              placeholder="Ej. Cerrado"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Redes Sociales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
              Facebook
            </label>
            <input
              type="url"
              id="facebook"
              value={formData.socialNetworks.facebook}
              onChange={(e) => handleSocialNetworkChange('facebook', e.target.value)}
              className="mt-1 input"
              placeholder="Ej. https://facebook.com/minegocio"
            />
          </div>

          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
              Instagram
            </label>
            <input
              type="url"
              id="instagram"
              value={formData.socialNetworks.instagram}
              onChange={(e) => handleSocialNetworkChange('instagram', e.target.value)}
              className="mt-1 input"
              placeholder="Ej. https://instagram.com/minegocio"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className="btn btn-outline"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep(4)}
          className="btn btn-primary"
        >
          Siguiente
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Fotografías del Negocio</h3>
        <p className="text-sm text-gray-500 mb-4">
          Agrega hasta 5 fotografías usando enlaces. Las fotos ayudarán a los clientes a conocer mejor tu negocio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index} className="space-y-2">
              <label htmlFor={`photo-${index}`} className="text-sm font-medium text-gray-700 block">
                Imagen {index + 1}
              </label>
              <input
                id={`photo-${index}`}
                type="url"
                placeholder="https://..."
                value={photos[index] || ''}
                onChange={(e) => {
                const url = e.target.value;
                  if (url.length > MAX_PHOTO_URL_LENGTH) {
                    setError('El enlace de la foto es demasiado largo (máx. 350 caracteres)');
                    return;
                  }
                  setError(null);
                  const newPhotos = [...photos];
                  newPhotos[index] = url;
                  setPhotos(newPhotos);
                }}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {photos[index] && (
                <img
                  src={photos[index]}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md border"
                  onError={(e) =>
                    (e.currentTarget.src = 'https://via.placeholder.com/150?text=URL+inválida')
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="btn btn-outline"
        >
          Anterior
        </button>
        <button type="submit" className="btn btn-primary">
          Registrar Negocio
        </button>
      </div>
    </div>
  );

  return (
    <>
      <PageHeader
        title="Registrar Nuevo Negocio"
        subtitle="Completa el formulario para registrar tu negocio en nuestra plataforma"
        image="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10"></div>
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step <= currentStep ? 'bg-accent-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>Información Básica</span>
              <span>Contacto</span>
              <span>Horarios</span>
              <span>Fotos</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </form>
          </div>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Al registrar tu negocio, aceptas nuestros{' '}
            <a href="#" className="text-accent-500 hover:text-accent-500">
              Términos y Condiciones
            </a>{' '}
            y{' '}
            <a href="#" className="text-accent-500 hover:text-accent-500">
              Política de Privacidad
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterBusinessPage;