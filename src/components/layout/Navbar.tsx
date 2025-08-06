import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, Calendar, Info, ShoppingBag, LogOut, BarChart, HelpCircle, Smartphone, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <Logo className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/"
              className={({isActive}) =>
                `px-3 py-2 rounded-md font-medium flex items-center ${
                  isActive
                    ? 'bg-accent-500 bg-primary-50'
                    : 'text-gray-700 hover:bg-accent-500 hover:bg-gray-50'
                }`
              }
            >
              <Home className="mr-1 h-4 w-4" />
              <span>Inicio</span>
            </NavLink>
            
            <NavLink
              to="/negocios"
              className={({isActive}) =>
                `px-3 py-2 rounded-md font-medium flex items-center ${
                  isActive
                    ? 'bg-accent-500 bg-primary-50'
                    : 'text-gray-700 hover:bg-accent-500 hover:bg-gray-50'
                }`
              }
            >
              <MapPin className="mr-1 h-4 w-4" />
              <span>Negocios</span>
            </NavLink>

            <NavLink
              to="/eventos"
              className={({isActive}) =>
                `px-3 py-2 rounded-md font-medium flex items-center ${
                  isActive
                    ? 'bg-accent-500 bg-primary-50'
                    : 'text-gray-700 hover:bg-accent-500 hover:bg-gray-50'
                }`
              }
            >
              <Calendar className="mr-1 h-4 w-4" />
              <span>Eventos</span>
            </NavLink>

            {/* <NavLink
              to="/diagnostico-digital"
              className={({isActive}) =>
                `px-3 py-2 rounded-md font-medium flex items-center ${
                  isActive
                    ? 'bg-accent-500 bg-primary-50'
                    : 'text-gray-700 hover:bg-accent-500 hover:bg-gray-50'
                }`
              }
            >
              <Smartphone className="mr-1 h-4 w-4" />
              <span>Diagnóstico Digital</span>
            </NavLink> */}

            {/* <NavLink
              to="/acerca"
              className={({isActive}) =>
                `px-3 py-2 rounded-md font-medium flex items-center ${
                  isActive
                    ? 'bg-accent-500 bg-primary-50'
                    : 'text-gray-700 hover:bg-accent-500 hover:bg-gray-50'
                }`
              }
            >
              <Info className="mr-1 h-4 w-4" />
              <span>Acerca</span>
            </NavLink>

            <NavLink
              to="/soporte"
              className={({isActive}) =>
                `px-3 py-2 rounded-md font-medium flex items-center ${
                  isActive
                    ? 'bg-accent-500 bg-primary-50'
                    : 'text-gray-700 hover:bg-accent-500 hover:bg-gray-50'
                }`
              }
            >
              <HelpCircle className="mr-1 h-4 w-4" />
              <span>Soporte</span>
            </NavLink> */}

            {user ? (
              <>
                {user.role === 'admin' && (
                  <NavLink
                    to="/admin"
                    className={({isActive}) =>
                      `px-3 py-2 rounded-md font-medium flex items-center ${
                        isActive
                          ? 'bg-accent-500 bg-primary-50'
                          : 'text-gray-700 hover:bg-accent-500 hover:bg-gray-50'
                      }`
                    }
                  >
                    <BarChart className="mr-1 h-4 w-4" />
                    <span>Panel Admin</span>
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md font-medium flex items-center text-gray-700 hover:bg-accent-500 hover:bg-gray-50"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </>
            ) : (
              <Link to="/business/register" className="btn btn-primary">
                <ShoppingBag className="h-4 w-4" />
                <span>Registrar Negocio</span>
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:bg-accent-500 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3 space-y-2">
            
            <NavLink
              to="/"
              className={({isActive}) =>
                `block px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? 'bg-accent-500 bg-primary-50'
                    : 'text-gray-700 hover:bg-accent-500 hover:bg-gray-50'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                <span>Inicio</span>
              </div>
            </NavLink>
            
            <NavLink
              to="/negocios"
              className={({isActive}) =>
                `block px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? 'bg-accent-500 bg-primary-50'
                    : 'text-gray-700 hover:bg-accent-500 hover:bg-gray-50'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>Negocios</span>
              </div>
            </NavLink>

            <NavLink
              to="/eventos"
              className={({isActive}) =>
                `block px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? 'bg-accent-500 bg-primary-50'
                    : 'text-gray-700 hover:bg-accent-500 hover:bg-gray-50'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>Eventos</span>
              </div>
            </NavLink>

            {/* <NavLink
              to="/diagnostico-digital"
              className={({isActive}) =>
                `block px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? 'bg-accent-500 bg-primary-50'
                    : 'text-gray-700 hover:bg-accent-500 hover:bg-gray-50'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Smartphone className="mr-2 h-5 w-5" />
                <span>Diagnóstico Digital</span>
              </div>
            </NavLink> */}

            {/* <NavLink
              to="/acerca"
              className={({isActive}) =>
                `block px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? 'bg-accent-500 bg-primary-50'
                    : 'text-gray-700 hover:bg-accent-500 hover:bg-gray-50'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Info className="mr-2 h-5 w-5" />
                <span>Acerca</span>
              </div>
            </NavLink>

            <NavLink
              to="/soporte"
              className={({isActive}) =>
                `block px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? 'bg-accent-500 bg-primary-50'
                    : 'text-gray-700 hover:bg-accent-500 hover:bg-gray-50'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5" />
                <span>Soporte</span>
              </div>
            </NavLink> */}

            {user ? (
              <>
                {user.role === 'admin' && (
                  <NavLink
                    to="/admin"
                    className={({isActive}) =>
                      `block px-3 py-2 rounded-md font-medium ${
                        isActive
                          ? 'bg-accent-500 bg-primary-50'
                          : 'text-gray-700 hover:bg-accent-500 hover:bg-gray-50'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <BarChart className="mr-2 h-5 w-5" />
                      <span>Panel Admin</span>
                    </div>
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 rounded-md font-medium flex items-center text-gray-700 hover:bg-accent-500 hover:bg-gray-50"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  <span>Cerrar Sesión</span>
                </button>
              </>
            ) : (
              <Link
                to="/business/register"
                className="block px-3 py-2 bg-accent-500 text-white rounded-md font-medium hover:bg-accent-500"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  <span>Registrar Negocio</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;