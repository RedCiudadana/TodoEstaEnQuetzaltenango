import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      businesses: {
        Row: {
          id: string;
          name: string;
          category: string;
          subcategory: string | null;
          municipality: string;
          address: string;
          description: string;
          phone: string | null;
          email: string | null;
          website: string | null;
          payment_methods: string[];
          operating_hours: Record<string, string>;
          social_networks: Record<string, string>;
          featured_products: string[];
          photos: string[];
          location: string | null;
          status: 'pending' | 'approved' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          subcategory?: string | null;
          municipality: string;
          address: string;
          description: string;
          phone?: string | null;
          email?: string | null;
          website?: string | null;
          payment_methods?: string[];
          operating_hours?: Record<string, string>;
          social_networks?: Record<string, string>;
          featured_products?: string[];
          photos?: string[];
          location?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          subcategory?: string | null;
          municipality?: string;
          address?: string;
          description?: string;
          phone?: string | null;
          email?: string | null;
          website?: string | null;
          payment_methods?: string[];
          operating_hours?: Record<string, string>;
          social_networks?: Record<string, string>;
          featured_products?: string[];
          photos?: string[];
          location?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          icon: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          icon: string;
          description?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          icon?: string;
          description?: string | null;
        };
      };
      municipalities: {
        Row: {
          id: string;
          name: string;
          department: string;
          coordinates: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          department?: string;
          coordinates?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          department?: string;
          coordinates?: string | null;
        };
      };
      events: {
        Row: {
          id: string;
          name: string;
          description: string;
          date: string;
          start_time: string;
          end_time: string | null;
          location: string;
          municipality: string;
          address: string;
          organizer: string;
          category: string;
          photo: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          date: string;
          start_time: string;
          end_time?: string | null;
          location: string;
          municipality: string;
          address: string;
          organizer: string;
          category: string;
          photo?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          date?: string;
          start_time?: string;
          end_time?: string | null;
          location?: string;
          municipality?: string;
          address?: string;
          organizer?: string;
          category?: string;
          photo?: string | null;
        };
      };
    };
  };
}