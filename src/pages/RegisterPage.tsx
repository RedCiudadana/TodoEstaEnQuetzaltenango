import React, { useState } from 'react';
import { Store, Camera, X } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const RegisterPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    window.scrollTo(0, 0);
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // Simulate file upload (in a real app, you'd upload these to a server)
    const newPhotos = [...photos];
    
    for (let i = 0; i < files.length; i++) {
      if (newPhotos.length >= 5) break; // Maximum 5 photos
      
      const file = files[i];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        newPhotos.push(reader.result as string);
        setPhotos([...newPhotos]);
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };
  
  if (submitted) {
    return (
      <>
        <PageHeader 
          title="¡Registro Exitoso!"
          subtitle="Gracias por registrar tu negocio en nuestra plataforma"
          image="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg"
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-success-100 rounded-full">
                <Store className="h-8 w-8 text-success-500" />
              </div>
              
              <h1 className="text-3xl font-heading font-bold text-gray-800 mb-4">
                ¡Solicitud Enviada con Éxito!
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                Gracias por registrar tu negocio. Hemos recibido tu información y la estamos revisando.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
                <h2 className="text-lg font-heading font-semibold mb-3">¿Qué sigue?</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Nuestro equipo revisará la información de tu negocio</li>
                  <li>Te enviaremos un correo electrónico cuando el negocio sea aprobado</li>
                  <li>Una vez aprobado, tu negocio aparecerá en nuestra plataforma</li>
                  <li>Podrás actualizar la información cuando lo necesites</li>
                </ol>
              </div>
              
              <button 
                onClick={() => setSubmitted(false)}
                className="btn btn-primary"
              >
                Registrar Otro Negocio
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <PageHeader 
        title="Registra tu Negocio"
        subtitle="Forma parte de nuestra comunidad empresarial"
        image="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              {/* Business Information */}
              <div className="mb-8">
                <h2 className="text-xl font-heading font-semibold mb-4 pb-2 border-b border-gray-200">
                  Información del Negocio
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Nombre del Negocio *
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="input"
                      placeholder="Ej. Café Evolución"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                      Categoría *
                    </label>
                    <select 
                      id="category" 
                      required
                      className="select"
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="restaurantes">Restaurantes</option>
                      <option value="artesanias">Artesanías</option>
                      <option value="hospedaje">Hospedaje</option>
                      <option value="moda">Moda y Textiles</option>
                      <option value="servicios">Servicios</option>
                      <option value="mercados">Mercados</option>
                      <option value="agricultura">Agricultura</option>
                      <option value="turismo">Turismo</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="municipality" className="block text-gray-700 font-medium mb-2">
                      Municipio *
                    </label>
                    <select 
                      id="municipality" 
                      required
                      className="select"
                    >
                      <option value="">Seleccionar municipio</option>
                      <option value="quetzaltenango">Quetzaltenango</option>
                      <option value="coatepeque">Coatepeque</option>
                      <option value="cantel">Cantel</option>
                      <option value="salcaja">Salcajá</option>
                      <option value="zunil">Zunil</option>
                      <option value="almolonga">Almolonga</option>
                      <option value="olintepeque">Olintepeque</option>
                      <option value="san-carlos-sija">San Carlos Sija</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                      Dirección *
                    </label>
                    <input 
                      type="text" 
                      id="address" 
                      required
                      className="input"
                      placeholder="Ej. 12 calle, zona 1"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                      Descripción del Negocio *
                    </label>
                    <textarea 
                      id="description" 
                      rows={4}
                      required
                      className="input"
                      placeholder="Describe tu negocio, productos o servicios que ofreces..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Teléfono
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="input"
                      placeholder="Ej. +502 7765-4321"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Correo Electrónico
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="input"
                      placeholder="Ej. contacto@minegocio.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-gray-700 font-medium mb-2">
                      Sitio Web
                    </label>
                    <input 
                      type="url" 
                      id="website" 
                      className="input"
                      placeholder="Ej. https://minegocio.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Métodos de Pago *
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="payment1" className="mr-2" />
                        <label htmlFor="payment1" className="text-gray-700">Efectivo</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="payment2" className="mr-2" />
                        <label htmlFor="payment2" className="text-gray-700">Tarjeta de Crédito/Débito</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="payment3" className="mr-2" />
                        <label htmlFor="payment3" className="text-gray-700">Transferencia Bancaria</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Business Hours */}
              <div className="mb-8">
                <h2 className="text-xl font-heading font-semibold mb-4 pb-2 border-b border-gray-200">
                  Horario de Atención
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="monday" className="block text-gray-700 font-medium mb-2">
                      Lunes a Viernes
                    </label>
                    <input 
                      type="text" 
                      id="monday" 
                      className="input"
                      placeholder="Ej. 8:00 - 18:00"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="saturday" className="block text-gray-700 font-medium mb-2">
                      Sábado
                    </label>
                    <input 
                      type="text" 
                      id="saturday" 
                      className="input"
                      placeholder="Ej. 8:00 - 14:00"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="sunday" className="block text-gray-700 font-medium mb-2">
                      Domingo
                    </label>
                    <input 
                      type="text" 
                      id="sunday" 
                      className="input"
                      placeholder="Ej. Cerrado"
                    />
                  </div>
                </div>
              </div>
              
              {/* Social Networks */}
              <div className="mb-8">
                <h2 className="text-xl font-heading font-semibold mb-4 pb-2 border-b border-gray-200">
                  Redes Sociales
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="facebook" className="block text-gray-700 font-medium mb-2">
                      Facebook
                    </label>
                    <input 
                      type="url" 
                      id="facebook" 
                      className="input"
                      placeholder="Ej. https://facebook.com/minegocio"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="instagram" className="block text-gray-700 font-medium mb-2">
                      Instagram
                    </label>
                    <input 
                      type="url" 
                      id="instagram" 
                      className="input"
                      placeholder="Ej. https://instagram.com/minegocio"
                    />
                  </div>
                </div>
              </div>
              
              {/* Photos */}
              <div className="mb-8">
                <h2 className="text-xl font-heading font-semibold mb-4 pb-2 border-b border-gray-200">
                  Fotografías (Máximo 5)
                </h2>
                
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">
                    Agrega fotografías de tu negocio, productos o servicios.
                  </p>
                  
                  <div className="mt-2 flex flex-wrap gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={photo} 
                          alt={`Foto ${index + 1}`} 
                          className="h-24 w-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          aria-label="Remove photo"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    
                    {photos.length < 5 && (
                      <label className="h-24 w-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <Camera className="h-8 w-8 text-gray-400" />
                        <span className="mt-1 text-xs text-gray-500">Agregar</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handlePhotoChange}
                          multiple
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="text-center mt-8">
                <button type="submit" className="btn btn-primary text-lg py-3 px-8">
                  Enviar Solicitud
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            Al enviar este formulario, aceptas nuestros Términos y Condiciones y nuestra Política de Privacidad.
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;