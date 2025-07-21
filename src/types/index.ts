// Business Types
export interface BusinessMarkdown {
  nombre: string;
  categorias: string[];
  municipio: string;
  direccion: string;
  ubicacion?: string;
  descripcion?: string;
  telefono?: string;
  correo_electronico?: string;
  sitio_web?: string;
  pago_efectivo?: boolean;
  pago_tarjeta?: boolean;
  pago_transferencia?: boolean;
  horario_lunes_viernes?: string;
  horario_sabado?: string;
  horario_domingo?: string;
  facebook?: string;
  instagram?: string;
  fotos?: string[];
}

// Event Types
export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime?: string;
  location: string;
  municipality: string;
  address: string;
  organizer: string;
  category: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

// Filter Types
export interface BusinessFilters {
  nombre?: string;
  categoria?: string;
  municipio?: string;
}

export interface EventFilters {
  name?: string;
  category?: string;
  municipality?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Municipality and Category Types
export interface Municipality {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'business_owner' | 'user';
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}