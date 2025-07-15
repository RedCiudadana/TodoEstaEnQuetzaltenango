import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Search, 
  Filter, 
  ChevronDown, 
  CheckCircle, 
  XCircle, 
  Clock,
  ArrowLeft
} from 'lucide-react';
import { recentRegistrations, categories, municipalities } from '../../data/mockData';

const BusinessRegistrationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('');

  // Filter registrations
  const filteredRegistrations = recentRegistrations.filter(registration => {
    const matchesSearch = registration.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || registration.status === selectedStatus;
    const matchesCategory = !selectedCategory || registration.category === selectedCategory;
    const matchesMunicipality = !selectedMunicipality || registration.municipality === selectedMunicipality;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesMunicipality;
  });

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Export to Excel
  const exportToExcel = () => {
    const headers = ['Negocio', 'Categoría', 'Municipio', 'Estado', 'Fecha'];
    const data = filteredRegistrations.map(reg => [
      reg.businessName,
      reg.category,
      reg.municipality,
      reg.status === 'approved' ? 'Aprobado' : reg.status === 'rejected' ? 'Rechazado' : 'Pendiente',
      formatDate(reg.submittedAt)
    ]);

    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `registros_negocios_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link 
          to="/admin" 
          className="text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-800">
            Registros de Negocios
          </h1>
          <p className="text-gray-600">
            Gestiona y revisa las solicitudes de registro
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="select"
              >
                <option value="">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="approved">Aprobado</option>
                <option value="rejected">Rechazado</option>
              </select>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select"
              >
                <option value="">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedMunicipality}
                onChange={(e) => setSelectedMunicipality(e.target.value)}
                className="select"
              >
                <option value="">Todos los municipios</option>
                {municipalities.map(municipality => (
                  <option key={municipality.id} value={municipality.name}>
                    {municipality.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {filteredRegistrations.length} registros encontrados
            </p>
            <button
              onClick={exportToExcel}
              className="btn btn-outline flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              <span>Exportar a Excel</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Negocio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Municipio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRegistrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {registration.businessName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {registration.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {registration.municipality}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        registration.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : registration.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {registration.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {registration.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                      {registration.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                      {registration.status === 'approved'
                        ? 'Aprobado'
                        : registration.status === 'rejected'
                        ? 'Rechazado'
                        : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(registration.submittedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="bg-accent-500 hover:text-primary-900 mr-3">
                      Ver detalles
                    </button>
                    {registration.status === 'pending' && (
                      <>
                        <button className="text-green-600 hover:text-green-900 mr-3">
                          Aprobar
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Rechazar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistrationsPage;