import React from 'react';
import { Search, Store, Calendar, MapPin, Clock, Phone, Mail, Globe, AlertCircle, HelpCircle, CheckCircle } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const SupportPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Centro de Ayuda"
        subtitle="Guía completa sobre cómo usar Todo Está en Quetzaltenango"
        image="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <a href="#buscar" className="card card-hover p-4 flex items-center">
              <Search className="h-5 w-5 text-accent-500 mr-2" />
              <span>Cómo Buscar</span>
            </a>
            <a href="#registrar" className="card card-hover p-4 flex items-center">
              <Store className="h-5 w-5 text-accent-500 mr-2" />
              <span>Registrar Negocio</span>
            </a>
            <a href="#eventos" className="card card-hover p-4 flex items-center">
              <Calendar className="h-5 w-5 text-accent-500 mr-2" />
              <span>Eventos</span>
            </a>
          </div>

          {/* Search Section */}
          <section id="buscar" className="mb-12">
            <div className="card p-6">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4 flex items-center">
                <Search className="h-6 w-6 text-accent-500 mr-2" />
                Cómo Buscar Negocios
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Búsqueda por Nombre</h3>
                  <p className="text-gray-600">
                    Usa la barra de búsqueda en la parte superior para encontrar negocios por nombre o descripción.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Filtros</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Categoría: Filtra por tipo de negocio</li>
                    <li>Municipio: Encuentra negocios en áreas específicas</li>
                    <li>Estado: Ver negocios activos o pendientes</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Vista de Mapa</h3>
                  <p className="text-gray-600">
                    Cambia entre vista de lista y mapa para visualizar la ubicación de los negocios.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Register Business Section */}
          <section id="registrar" className="mb-12">
            <div className="card p-6">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4 flex items-center">
                <Store className="h-6 w-6 text-accent-500 mr-2" />
                Registrar tu Negocio
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Proceso de Registro</h3>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    <li>Completa el formulario con la información básica</li>
                    <li>Agrega detalles de contacto y ubicación</li>
                    <li>Establece horarios de atención</li>
                    <li>Sube fotos de tu negocio (máximo 5)</li>
                    <li>Envía la solicitud para revisión</li>
                  </ol>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Requisitos</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Nombre y descripción del negocio</li>
                    <li>Dirección física en Quetzaltenango</li>
                    <li>Información de contacto válida</li>
                    <li>Fotos reales del negocio</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Proceso de Aprobación</h3>
                  <p className="text-gray-600 mb-2">
                    Después de enviar tu solicitud:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Revisión por nuestro equipo (1-2 días hábiles)</li>
                    <li>Notificación por correo electrónico</li>
                    <li>Publicación en el directorio si es aprobado</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Events Section */}
          <section id="eventos" className="mb-12">
            <div className="card p-6">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4 flex items-center">
                <Calendar className="h-6 w-6 text-accent-500 mr-2" />
                Eventos y Actividades
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Búsqueda de Eventos</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Filtra por fecha y categoría</li>
                    <li>Busca eventos por municipio</li>
                    <li>Ver detalles completos del evento</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Tipos de Eventos</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Ferias comerciales</li>
                    <li>Eventos culturales</li>
                    <li>Festivales gastronómicos</li>
                    <li>Actividades municipales</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mb-12">
            <div className="card p-6">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4 flex items-center">
                <HelpCircle className="h-6 w-6 text-accent-500 mr-2" />
                Preguntas Frecuentes
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">¿Es gratis registrar mi negocio?</h3>
                  <p className="text-gray-600">
                    Sí, el registro de negocios es completamente gratuito.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">¿Cuánto tarda la aprobación?</h3>
                  <p className="text-gray-600">
                    El proceso de aprobación normalmente toma entre 1 y 2 días hábiles.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">¿Puedo editar mi información después?</h3>
                  <p className="text-gray-600">
                    Sí, una vez aprobado tu negocio, podrás actualizar la información cuando lo necesites.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">¿Qué hacer si mi solicitud es rechazada?</h3>
                  <p className="text-gray-600">
                    Te enviaremos un correo con los motivos y podrás volver a enviar la solicitud con las correcciones necesarias.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section id="contacto" className="mb-12">
            <div className="card p-6">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4 flex items-center">
                <AlertCircle className="h-6 w-6 text-accent-500 mr-2" />
                ¿Necesitas más ayuda?
              </h2>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Si tienes alguna pregunta o problema que no está cubierto en esta guía, contáctanos:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="mailto:soporte@todoestaq.com" className="bg-gray-50 p-4 rounded-lg flex items-center hover:bg-gray-100">
                    <Mail className="h-5 w-5 text-accent-500 mr-2" />
                    <span>soporte@todoestaq.com</span>
                  </a>

                  <a href="tel:+50277777777" className="bg-gray-50 p-4 rounded-lg flex items-center hover:bg-gray-100">
                    <Phone className="h-5 w-5 text-accent-500 mr-2" />
                    <span>+502 7777-7777</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SupportPage;