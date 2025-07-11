import { useState, useEffect } from 'react';
import { businesses as mockBusinesses } from '../data/mockData';
import type { Business } from '../types';

export function useBusinesses(filters?: {
  name?: string;
  category?: string;
  municipality?: string;
}) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let filteredBusinesses = [...mockBusinesses];

        // Apply filters
        if (filters?.name) {
          const searchTerm = filters.name.toLowerCase();
          filteredBusinesses = filteredBusinesses.filter(business =>
            business.name.toLowerCase().includes(searchTerm) ||
            business.description.toLowerCase().includes(searchTerm)
          );
        }

        if (filters?.category) {
          filteredBusinesses = filteredBusinesses.filter(business =>
            business.category.toLowerCase() === filters.category?.toLowerCase()
          );
        }

        if (filters?.municipality) {
          filteredBusinesses = filteredBusinesses.filter(business =>
            business.municipality.toLowerCase() === filters.municipality?.toLowerCase()
          );
        }

        setBusinesses(filteredBusinesses);
      } catch (err) {
        console.error('Error in fetchBusinesses:', err);
        setError('An error occurred while fetching businesses');
      } finally {
        setLoading(false);
      }
    }

    fetchBusinesses();
  }, [filters]);

  return { businesses, loading, error };
}