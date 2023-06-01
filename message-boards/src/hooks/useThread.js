import useSWR from 'swr';

import { supabase } from '../services/supabase';

async function getThread({ slug }) {
  const { data, error } = await supabase
    .from('MBThread')
    .select('*')
    .filter('slug', 'eq', slug);

  if (error) {
    throw new Error(error);
  }

  return data[0];
}

export const useThread = (slug) => {
  const { data: mbThread, mutate } = useSWR(
    {
      key: '/thread',
      slug,
    },
    getThread
  );

  return [mbThread, mutate];
};
