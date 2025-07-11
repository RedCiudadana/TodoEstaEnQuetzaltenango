// Business Types
export interface Business {
  id: string;
  name: string;
  description: string;
  address: string;
  municipality: string;
  category: string;
  subcategory?: string;
  phone?: string;
  email?: string;
  website?: string;
  socialNetworks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  operatingHours: OperatingHours;
  location: {
    lat: number;
    lng: number;
  };
  paymentMethods: string[];
  featuredProducts?: string[];
  photos: string[];
  createdAt: string;
  updatedAt: string;
}

export interface OperatingHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
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
  name?: string;
  category?: string;
  municipality?: string;
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