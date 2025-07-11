import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Municipality } from '../types';

export function useSupabaseMunicipalities() {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMunicipalities() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('municipalities')
          .select('*')
          .order('name');

        if (fetchError) {
          throw fetchError;
        }

        setMunicipalities(data || []);
      } catch (err) {
        console.error('Error fetching municipalities:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching municipalities');
      } finally {
        setLoading(false);
      }
    }

    fetchMunicipalities();
  }, []);

  return { municipalities, loading, error };
}