import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Users, TrendingUp, Check } from 'lucide-react';

const RegisterCTA: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
      {/* Decorative pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              ¿Tienes un negocio en Quetzaltenango?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Registra tu negocio gratuitamente y hazlo visible para miles de personas.
            </p>
            
            <Link to="/business/register" className="btn btn-accent text-lg py-3 px-6">
              <Store className="h-5 w-5" />
              <span>Registrar mi Negocio</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Mayor Visibilidad</h3>
              <p className="text-white/80">
                Llega a más clientes potenciales y aumenta tu presencia en la comunidad local.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Aumenta tus Ventas</h3>
              <p className="text-white/80">
                Promociona tus productos y servicios directamente a clientes interesados.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Totalmente Gratis</h3>
              <p className="text-white/80">
                El registro y la presencia de tu negocio en nuestra plataforma no tiene costo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterCTA;