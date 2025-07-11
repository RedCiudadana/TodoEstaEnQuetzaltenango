import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Business } from '../types';

interface BusinessFilters {
  name?: string;
  category?: string;
  municipality?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export function useSupabaseBusinesses(filters?: BusinessFilters) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('businesses')
          .select(`
            *,
            categories!inner(name, icon),
            municipalities!inner(name)
          `);

        // Apply status filter (default to approved for public view)
        if (filters?.status) {
          query = query.eq('status', filters.status);
        } else {
          query = query.eq('status', 'approved');
        }

        // Apply other filters
        if (filters?.category) {
          query = query.eq('category', filters.category);
        }

        if (filters?.municipality) {
          query = query.eq('municipality', filters.municipality);
        }

        if (filters?.name) {
          query = query.or(`name.ilike.%${filters.name}%,description.ilike.%${filters.name}%`);
        }

        const { data, error: fetchError } = await query.order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        // Transform data to match Business interface
        const transformedBusinesses: Business[] = (data || []).map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          address: item.address,
          municipality: item.municipalities.name,
          category: item.categories.name,
          subcategory: item.subcategory,
          phone: item.phone,
          email: item.email,
          website: item.website,
          socialNetworks: item.social_networks,
          operatingHours: item.operating_hours,
          location: item.location ? parseLocation(item.location) : { lat: 14.835, lng: -91.518 },
          paymentMethods: item.payment_methods || [],
          featuredProducts: item.featured_products || [],
          photos: item.photos || [],
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }));

        setBusinesses(transformedBusinesses);
      } catch (err) {
        console.error('Error fetching businesses:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching businesses');
      } finally {
        setLoading(false);
      }
    }

    fetchBusinesses();
  }, [filters]);

  return { businesses, loading, error };
}

// Helper function to parse PostgreSQL point format
function parseLocation(locationString: string): { lat: number; lng: number } {
  try {
    // PostgreSQL point format: (lng,lat)
    const match = locationString.match(/\(([^,]+),([^)]+)\)/);
    if (match) {
      const lng = parseFloat(match[1]);
      const lat = parseFloat(match[2]);
      return { lat, lng };
    }
  } catch (error) {
    console.error('Error parsing location:', error);
  }
  
  // Default to Quetzaltenango center if parsing fails
  return { lat: 14.835, lng: -91.518 };
}

// Function to submit a new business
export async function submitBusiness(businessData: any) {
  try {
    // Format location as PostgreSQL point
    const location = businessData.location 
      ? `(${businessData.location.lng},${businessData.location.lat})`
      : null;

    const { data, error } = await supabase
      .from('businesses')
      .insert({
        name: businessData.name,
        category: businessData.category,
        subcategory: businessData.subcategory,
        municipality: businessData.municipality,
        address: businessData.address,
        description: businessData.description,
        phone: businessData.phone,
        email: businessData.email,
        website: businessData.website,
        payment_methods: businessData.paymentMethods,
        operating_hours: businessData.operatingHours,
        social_networks: businessData.socialNetworks,
        featured_products: businessData.featuredProducts,
        photos: businessData.photos,
        location: location,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error submitting business:', error);
    throw error;
  }
}