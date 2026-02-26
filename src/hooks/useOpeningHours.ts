import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface OpeningHour {
  id: string;
  period_type: 'weekdays' | 'saturday' | 'sunday';
  opening_time: string | null;
  closing_time: string | null;
  is_open: boolean;
  created_at: string;
  updated_at: string;
}

export function useOpeningHours() {
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOpeningHours = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('opening_hours')
        .select('*');

      if (fetchError) throw fetchError;

      const periodOrder = { weekdays: 1, saturday: 2, sunday: 3 };
      const sortedData = (data || []).sort((a, b) => {
        return periodOrder[a.period_type] - periodOrder[b.period_type];
      });

      setOpeningHours(sortedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch opening hours');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpeningHours();
  }, []);

  const updateOpeningHours = async (updates: Partial<OpeningHour> & { id: string }) => {
    try {
      const { error: updateError } = await supabase
        .from('opening_hours')
        .update({
          opening_time: updates.opening_time,
          closing_time: updates.closing_time,
          is_open: updates.is_open,
          updated_at: new Date().toISOString(),
        })
        .eq('id', updates.id);

      if (updateError) throw updateError;

      await fetchOpeningHours();
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to update opening hours',
      };
    }
  };

  return {
    openingHours,
    loading,
    error,
    refetch: fetchOpeningHours,
    updateOpeningHours,
  };
}
