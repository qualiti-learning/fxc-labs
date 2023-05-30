import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export const useThread = (slug) => {
  const [mbThread, setMBThread] = useState(null);

  useEffect(() => {
    async function getThread() {
      const { data, error } = await supabase
        .from('MBThread')
        .select('*')
        .filter('slug', 'eq', slug);

      return { data, error };
    }

    getThread().then(({ data }) => setMBThread(data[0]));
  }, [slug]);

  return [mbThread, setMBThread];
};
