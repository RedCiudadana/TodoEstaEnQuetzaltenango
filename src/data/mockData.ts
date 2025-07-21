import { Event, Municipality, Category, User } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    email: 'admin@todoestaq.com',
    name: 'Administrador',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
  },
  {
    id: '2',
    email: 'negocio@example.com',
    name: 'Dueño de Negocio',
    role: 'business_owner',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
  },
  {
    id: '3',
    email: 'usuario@example.com',
    name: 'Usuario Regular',
    role: 'user',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
  },
];

// Mock credentials (in a real app, passwords would be hashed)
export const credentials = [
  { email: 'admin@todoestaq.com', password: 'admin123' },
  { email: 'negocio@example.com', password: 'negocio123' },
  { email: 'usuario@example.com', password: 'usuario123' },
];

// Mock Municipalities
export const municipalities: Municipality[] = [
  { id: 'quetzaltenango', name: 'Quetzaltenango' },
  { id: 'coatepeque', name: 'Coatepeque' },
  { id: 'cantel', name: 'Cantel' },
  { id: 'salcaja', name: 'Salcajá' },
  { id: 'zunil', name: 'Zunil' },
  { id: 'almolonga', name: 'Almolonga' },
  { id: 'olintepeque', name: 'Olintepeque' },
  { id: 'san-carlos-sija', name: 'San Carlos Sija' },
];

// Mock Categories
export const categories: Category[] = [
  { id: 'restaurantes', name: 'Restaurantes', icon: 'utensils' },
  { id: 'artesanias', name: 'Artesanías', icon: 'paint-brush' },
  { id: 'hospedaje', name: 'Hospedaje', icon: 'bed' },
  { id: 'moda', name: 'Moda y Textiles', icon: 'tshirt' },
  { id: 'servicios', name: 'Servicios', icon: 'briefcase' },
  { id: 'mercados', name: 'Mercados', icon: 'shopping-basket' },
  { id: 'agricultura', name: 'Agricultura', icon: 'leaf' },
  { id: 'turismo', name: 'Turismo', icon: 'mountain' },
];

// Mock Events
export const events: Event[] = [
  {
    id: '1',
    name: 'Feria de Independencia',
    description: 'Celebración anual con desfiles, música en vivo, comida tradicional y actividades culturales para conmemorar la independencia de Guatemala.',
    date: '2023-09-15',
    startTime: '10:00',
    endTime: '22:00',
    location: 'Parque Central y calles principales',
    municipality: 'Quetzaltenango',
    address: 'Parque Central, zona 1, Quetzaltenango',
    organizer: 'Municipalidad de Quetzaltenango',
    category: 'Cultural',
    photo: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    createdAt: '2023-06-15T09:30:00Z',
    updatedAt: '2023-06-15T09:30:00Z',
  },
  {
    id: '2',
    name: 'Feria del Textil Indígena',
    description: 'Exposición y venta de textiles tradicionales elaborados por artesanos locales. Incluye demostraciones de técnicas ancestrales de tejido.',
    date: '2023-07-22',
    startTime: '09:00',
    endTime: '18:00',
    location: 'Casa de la Cultura',
    municipality: 'Salcajá',
    address: 'Casa de la Cultura, 3a calle, zona 1, Salcajá',
    organizer: 'Asociación de Tejedores de Salcajá',
    category: 'Artesanal',
    photo: 'https://images.pexels.com/photos/6192334/pexels-photo-6192334.jpeg',
    createdAt: '2023-06-01T14:20:00Z',
    updatedAt: '2023-06-10T11:15:00Z',
  },
  {
    id: '3',
    name: 'Festival Gastronómico',
    description: 'Festival dedicado a la gastronomía local con degustaciones, talleres de cocina y concursos entre restaurantes locales.',
    date: '2023-08-05',
    startTime: '12:00',
    endTime: '20:00',
    location: 'Plaza Municipal',
    municipality: 'Coatepeque',
    address: 'Plaza Municipal, Coatepeque',
    organizer: 'Cámara de Comercio de Coatepeque',
    category: 'Gastronomía',
    photo: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    createdAt: '2023-05-25T10:45:00Z',
    updatedAt: '2023-06-02T15:30:00Z',
  },
  {
    id: '4',
    name: 'Festival de Bandas Escolares',
    description: 'Competencia anual de bandas escolares con participantes de todo el departamento. Incluye desfiles y presentaciones musicales.',
    date: '2023-10-12',
    startTime: '08:00',
    endTime: '17:00',
    location: 'Estadio Mario Camposeco',
    municipality: 'Quetzaltenango',
    address: 'Estadio Mario Camposeco, Quetzaltenango',
    organizer: 'Ministerio de Educación - Sede Quetzaltenango',
    category: 'Educativo',
    photo: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
    createdAt: '2023-06-20T16:15:00Z',
    updatedAt: '2023-06-20T16:15:00Z',
  },
  {
    id: '5',
    name: 'Exposición Agrícola',
    description: 'Feria agrícola donde productores locales exhiben sus mejores productos y comparten conocimientos sobre técnicas de cultivo.',
    date: '2023-11-18',
    startTime: '07:00',
    endTime: '16:00',
    location: 'Campo de la Feria',
    municipality: 'Almolonga',
    address: 'Campo de la Feria, Almolonga',
    organizer: 'Cooperativa Agrícola de Almolonga',
    category: 'Agricultura',
    photo: 'https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg',
    createdAt: '2023-06-05T08:30:00Z',
    updatedAt: '2023-06-18T12:20:00Z',
  },
];

// Mock Business Registration Stats
export const businessStats = {
  totalRegistrations: 156,
  pendingApproval: 12,
  approvedLastMonth: 24,
  rejectedLastMonth: 3,
  registrationsByCategory: [
    { category: 'Restaurantes', count: 45 },
    { category: 'Artesanías', count: 32 },
    { category: 'Hospedaje', count: 18 },
    { category: 'Moda', count: 25 },
    { category: 'Servicios', count: 20 },
    { category: 'Mercados', count: 8 },
    { category: 'Agricultura', count: 5 },
    { category: 'Turismo', count: 3 },
  ],
  registrationsByMunicipality: [
    { municipality: 'Quetzaltenango', count: 80 },
    { municipality: 'Coatepeque', count: 25 },
    { municipality: 'Cantel', count: 15 },
    { municipality: 'Salcajá', count: 12 },
    { municipality: 'Zunil', count: 8 },
    { municipality: 'Almolonga', count: 10 },
    { municipality: 'Olintepeque', count: 4 },
    { municipality: 'San Carlos Sija', count: 2 },
  ],
  monthlyRegistrations: [
    { month: 'Ene', count: 12 },
    { month: 'Feb', count: 15 },
    { month: 'Mar', count: 18 },
    { month: 'Abr', count: 22 },
    { month: 'May', count: 20 },
    { month: 'Jun', count: 25 },
    { month: 'Jul', count: 28 },
    { month: 'Ago', count: 24 },
    { month: 'Sep', count: 30 },
    { month: 'Oct', count: 27 },
    { month: 'Nov', count: 32 },
    { month: 'Dic', count: 24 },
  ],
};

// Mock Recent Registrations
export const recentRegistrations = [
  {
    id: 'reg1',
    businessName: 'Café del Centro',
    category: 'Restaurantes',
    municipality: 'Quetzaltenango',
    status: 'pending',
    submittedAt: '2024-03-15T10:30:00Z',
  },
  {
    id: 'reg2',
    businessName: 'Artesanías Maya',
    category: 'Artesanías',
    municipality: 'Salcajá',
    status: 'approved',
    submittedAt: '2024-03-14T15:45:00Z',
  },
  {
    id: 'reg3',
    businessName: 'Hotel Vista Hermosa',
    category: 'Hospedaje',
    municipality: 'Quetzaltenango',
    status: 'pending',
    submittedAt: '2024-03-14T09:20:00Z',
  },
  {
    id: 'reg4',
    businessName: 'Textiles Tradicionales',
    category: 'Moda',
    municipality: 'Cantel',
    status: 'rejected',
    submittedAt: '2024-03-13T16:15:00Z',
  },
  {
    id: 'reg5',
    businessName: 'Mercado Central',
    category: 'Mercados',
    municipality: 'Coatepeque',
    status: 'approved',
    submittedAt: '2024-03-13T11:50:00Z',
  },
];