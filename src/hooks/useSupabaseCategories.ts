import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Category } from '../types';

export function useSupabaseCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (fetchError) {
          throw fetchError;
        }

        setCategories(data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching categories');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}