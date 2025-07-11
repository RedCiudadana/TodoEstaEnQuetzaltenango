import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, LogIn, Code, Smartphone } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../auth/LoginModal';
import Logo from './Logo';

const Footer: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <footer className="bg-secondary-800 text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Logo className="h-10 w-auto" />
              <span className="ml-2 text-lg font-heading font-bold text-white">
                TEQ
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Una plataforma para promocionar los negocios locales y emprendimientos 
              del departamento de Quetzaltenango, Guatemala.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-heading font-semibold text-white text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/negocios" className="text-gray-300 hover:text-white transition-colors">
                  Negocios
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="text-gray-300 hover:text-white transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/diagnostico-digital" className="text-gray-300 hover:text-white transition-colors">
                  Diagnóstico Digital
                </Link>
              </li>
              <li>
                <Link to="/acerca" className="text-gray-300 hover:text-white transition-colors">
                  Acerca
                </Link>
              </li>
              <li>
                {!user ? (
                  <button 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    <span>Iniciar Sesión</span>
                  </button>
                ) : (
                  <Link to="/business/register" className="text-gray-300 hover:text-white transition-colors">
                    Registrar Negocio
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-heading font-semibold text-white text-lg mb-4">Municipios</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/negocios?municipio=Quetzaltenango" className="text-gray-300 hover:text-white transition-colors">
                  Quetzaltenango
                </Link>
              </li>
              <li>
                <Link to="/negocios?municipio=Coatepeque" className="text-gray-300 hover:text-white transition-colors">
                  Coatepeque
                </Link>
              </li>
              <li>
                <Link to="/negocios?municipio=Cantel" className="text-gray-300 hover:text-white transition-colors">
                  Cantel
                </Link>
              </li>
              <li>
                <Link to="/negocios?municipio=Salcajá" className="text-gray-300 hover:text-white transition-colors">
                  Salcajá
                </Link>
              </li>
              <li>
                <Link to="/negocios" className="text-accent-500 hover:text-accent-400 transition-colors">
                  Ver todos →
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-heading font-semibold text-white text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-0.5 mr-2 text-primary-400" />
                <span className="text-gray-300">
                  Quetzaltenango, Guatemala
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary-400" />
                <span className="text-gray-300">
                  +502 7777-7777
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary-400" />
                <a 
                  href="mailto:contacto@todoestaquetzaltenango.com" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  contacto@todoestaq.com
                </a>
              </li>
              <li className="flex items-center">
                <Code className="h-5 w-5 mr-2 text-primary-400" />
                <Link 
                  to="/docs" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Documentación Técnica
                </Link>
              </li>
              <li className="flex items-center">
                <Smartphone className="h-5 w-5 mr-2 text-primary-400" />
                <a 
                  href="https://conectafuturo.redciudadana.org" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Conecta Futuro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Todo Está en Quetzaltenango. Todos los derechos reservados.</p>
        </div>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </footer>
  );
};

export default Footer;