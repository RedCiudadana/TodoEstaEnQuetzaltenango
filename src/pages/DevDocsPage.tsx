import React from 'react';
import { Code, Database, Package, GitBranch, Terminal, Server } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const DevDocsPage: React.FC = () => {
  return (
    <>
      <PageHeader 
        title="Documentación Técnica"
        subtitle="Información técnica para desarrolladores"
        image="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Tech Stack Section */}
          <section className="mb-12">
            <div className="card p-6">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                <Code className="h-6 w-6 text-primary-500 mr-2" />
                Stack Tecnológico
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Frontend</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• React 18.3.1 con TypeScript</li>
                    <li>• Vite como bundler y dev server</li>
                    <li>• React Router para navegación</li>
                    <li>• Tailwind CSS para estilos</li>
                    <li>• Lucide React para iconos</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Backend</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• PostgreSQL como base de datos</li>
                    <li>• Edge Functions para lógica serverless</li>
                    <li>• Row Level Security (RLS) para seguridad</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Servicios Externos</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Mapbox para mapas interactivos</li>
                    <li>• Chart.js para visualizaciones</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Database Section */}
          <section className="mb-12">
            <div className="card p-6">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                <Database className="h-6 w-6 text-primary-500 mr-2" />
                Estructura de la Base de Datos
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tabla</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">businesses</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        Almacena información de negocios registrados incluyendo detalles de contacto, ubicación y estado
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-gray-800 mb-2">Políticas de Seguridad</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Acceso público solo a negocios aprobados</li>
                  <li>Acceso completo para administradores</li>
                  <li>RLS habilitado en todas las tablas</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Development Section */}
          <section className="mb-12">
            <div className="card p-6">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                <Terminal className="h-6 w-6 text-primary-500 mr-2" />
                Desarrollo Local
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Requisitos</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Node.js 18 o superior</li>
                    <li>npm 9 o superior</li>
                    <li>Variables de entorno configuradas</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Comandos Principales</h3>
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white">
                    <p className="mb-2"># Instalar dependencias</p>
                    <p className="text-green-400 mb-4">npm install</p>
                    
                    <p className="mb-2"># Iniciar servidor de desarrollo</p>
                    <p className="text-green-400 mb-4">npm run dev</p>
                    
                    <p className="mb-2"># Construir para producción</p>
                    <p className="text-green-400">npm run build</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Environment Variables */}
          <section className="mb-12">
            <div className="card p-6">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                <Server className="h-6 w-6 text-primary-500 mr-2" />
                Variables de Entorno
              </h2>

              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <pre className="text-white">
{`VITE_MAPBOX_TOKEN=your_mapbox_token`}
                </pre>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>Crea un archivo <code className="bg-gray-100 px-2 py-1 rounded">.env</code> en la raíz del proyecto con estas variables.</p>
              </div>
            </div>
          </section>

          {/* Dependencies Section */}
          <section className="mb-12">
            <div className="card p-6">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                <Package className="h-6 w-6 text-primary-500 mr-2" />
                Dependencias Principales
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Producción</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• react-router-dom - Enrutamiento</li>
                    <li>• chart.js & react-chartjs-2 - Gráficos</li>
                    <li>• mapbox-gl - Mapas interactivos</li>
                    <li>• lucide-react - Iconos</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Desarrollo</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• TypeScript - Tipado estático</li>
                    <li>• Vite - Bundler y dev server</li>
                    <li>• ESLint - Linting</li>
                    <li>• Tailwind CSS - Utilidades CSS</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contributing Section */}
          <section>
            <div className="card p-6">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                <GitBranch className="h-6 w-6 text-primary-500 mr-2" />
                Contribuir
              </h2>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Este proyecto es de código abierto y las contribuciones son bienvenidas. Por favor, asegúrate de:
                </p>

                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Seguir las guías de estilo de código</li>
                  <li>Escribir pruebas para nuevas funcionalidades</li>
                  <li>Actualizar la documentación cuando sea necesario</li>
                  <li>Crear issues para bugs y nuevas funcionalidades</li>
                </ul>

                <div className="mt-6">
                  <a 
                    href="https://github.com/RedCiudadana/TodoEstaEnQuetzaltenango" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Ver en GitHub
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

export default DevDocsPage;