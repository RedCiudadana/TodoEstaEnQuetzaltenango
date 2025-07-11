import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

const RegisterSuccessPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="¡Registro Exitoso!"
        subtitle="Tu negocio ha sido registrado exitosamente en nuestra plataforma"
        image="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-success-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-success-500" />
              </div>
            </div>

            <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4">
              ¡Gracias por registrar tu negocio!
            </h2>

            <p className="text-gray-600 mb-6">
              Hemos recibido tu solicitud de registro. Nuestro equipo revisará la información
              proporcionada y te notificaremos cuando tu negocio sea aprobado.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-medium text-gray-800 mb-3">Próximos pasos:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span>Revisaremos la información proporcionada</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span>Te enviaremos un correo electrónico con la confirmación</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span>Una vez aprobado, tu negocio aparecerá en nuestro directorio</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">4.</span>
                  <span>Podrás acceder a tu panel para gestionar tu información</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn btn-primary">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver al Inicio
              </Link>
              <Link to="/business/register" className="btn btn-outline">
                Registrar Otro Negocio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterSuccessPage;