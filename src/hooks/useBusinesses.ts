import { useState, useEffect } from 'react';
import { getBusinessesFromMarkdown } from '../data/loadBusinesses';
import type { BusinessMarkdown } from '../types';
import { toSlug } from '../lib/slug';

export function useBusinesses(filters?: {
  nombre?: string;
  categoria?: string;
  municipio?: string;
}) {
  const [businesses, setBusinesses] = useState<BusinessMarkdown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        setLoading(true);
        setError(null);

        const allBusinesses = await getBusinessesFromMarkdown();
        let filteredBusinesses = [...allBusinesses];

        // Filtros
        if (filters?.nombre) {
          const searchTerm = filters.nombre.toLowerCase();
          filteredBusinesses = filteredBusinesses.filter(business =>
            business.nombre.toLowerCase().includes(searchTerm) ||
            (business.descripcion?.toLowerCase().includes(searchTerm) ?? false)
          );
        }

        if (filters?.categoria) {
          filteredBusinesses = filteredBusinesses.filter(business =>
            business.categorias.map(c => c.toLowerCase()).includes(filters.categoria!.toLowerCase())
          );
        }

        if (filters?.municipio) {
          const wantedMunicipalitySlug = toSlug(filters.municipio);
          filteredBusinesses = filteredBusinesses.filter(business =>
            toSlug(business.municipio) === wantedMunicipalitySlug
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