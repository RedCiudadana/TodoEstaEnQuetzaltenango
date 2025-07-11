import React from 'react';
import {
  BarChart,
  PieChart,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Building2,
  MapPin,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { businessStats, recentRegistrations } from '../data/mockData';
import { Link } from 'react-router-dom';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboardPage: React.FC = () => {
  // Chart data for monthly registrations
  const monthlyData = {
    labels: businessStats.monthlyRegistrations.map(item => item.month),
    datasets: [
      {
        label: 'Registros Mensuales',
        data: businessStats.monthlyRegistrations.map(item => item.count),
        backgroundColor: '#E63946',
      },
    ],
  };

  // Chart data for categories
  const categoryData = {
    labels: businessStats.registrationsByCategory.map(item => item.category),
    datasets: [
      {
        data: businessStats.registrationsByCategory.map(item => item.count),
        backgroundColor: [
          '#E63946',
          '#457B9D',
          '#1D3557',
          '#F4A261',
          '#2A9D8F',
          '#264653',
          '#A8DADC',
          '#FFB703',
        ],
      },
    ],
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-800 mb-2">
          Panel de Administración
        </h1>
        <p className="text-gray-600">
          Monitorea y gestiona los registros de negocios
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary-100 rounded-full p-3">
              <Building2 className="h-6 w-6 text-primary-500" />
            </div>
            <span className="text-sm font-medium text-gray-500">Total</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {businessStats.totalRegistrations}
              </h3>
              <p className="text-gray-600">Negocios registrados</p>
            </div>
            <div className="flex items-center text-success-500">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-medium">12%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-secondary-100 rounded-full p-3">
              <Clock className="h-6 w-6 text-secondary-500" />
            </div>
            <span className="text-sm font-medium text-gray-500">Pendientes</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {businessStats.pendingApproval}
              </h3>
              <p className="text-gray-600">Por aprobar</p>
            </div>
            <div className="flex items-center text-warning-500">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-medium">8%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-success-100 rounded-full p-3">
              <CheckCircle className="h-6 w-6 text-success-500" />
            </div>
            <span className="text-sm font-medium text-gray-500">Aprobados</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {businessStats.approvedLastMonth}
              </h3>
              <p className="text-gray-600">Último mes</p>
            </div>
            <div className="flex items-center text-success-500">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-medium">15%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 rounded-full p-3">
              <XCircle className="h-6 w-6 text-red-500" />
            </div>
            <span className="text-sm font-medium text-gray-500">Rechazados</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {businessStats.rejectedLastMonth}
              </h3>
              <p className="text-gray-600">Último mes</p>
            </div>
            <div className="flex items-center text-red-500">
              <ArrowDownRight className="h-4 w-4" />
              <span className="text-sm font-medium">2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold text-gray-800">
              Registros Mensuales
            </h2>
            <div className="bg-primary-50 rounded-full p-2">
              <BarChart className="h-5 w-5 text-primary-500" />
            </div>
          </div>
          <Bar
            data={monthlyData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold text-gray-800">
              Distribución por Categoría
            </h2>
            <div className="bg-primary-50 rounded-full p-2">
              <PieChart className="h-5 w-5 text-primary-500" />
            </div>
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <Pie
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold text-gray-800">
              Registros Recientes
            </h2>
            <Link 
              to="/admin/registros" 
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              Ver todos
            </Link>
          </div>
        </div>

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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentRegistrations.map((registration) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;