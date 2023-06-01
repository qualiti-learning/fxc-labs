import { useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import useSWR from 'swr';

import { supabase } from '../services/supabase';

// eslint-disable-next-line no-undef
const NODE_ENV = process.env.NODE_ENV;

async function getThreads() {
  const { data, error } = await supabase.from('MBThread').select('*');

  if (error) {
    throw new Error(error);
  }

  return data;
}

const useThreads = () => {
  const toast = useToast();

  const {
    data: questions = [],
    error,
    isLoading,
    mutate,
  } = useSWR('/MBThreads', getThreads);

  const deleteThread = useCallback(
    async (id) => {
      const { data, error } = await supabase
        .from('MBThread')
        .delete()
        .filter('id', 'eq', id)
        .select();

      if (error) {
        const errorMessage =
          NODE_ENV === 'development'
            ? error.message
            : 'An unexpected error happened...';

        return toast({
          description: errorMessage,
          position: 'bottom-right',
          status: 'error',
          title: 'Oops... Something went wrong',
        });
      }

      toast({
        position: 'bottom-right',
        status: data.length ? 'success' : 'warning',
        title: data.length
          ? `Great! Your thread was deleted.`
          : 'Oops... thread was not found.',
      });

      if (data.length) {
        mutate(
          (prevQuestions) =>
            prevQuestions.filter((question) => question.id !== id),
          { revalidate: false }
        );
      }
    },
    [toast, mutate]
  );

  return {
    error,
    loading: isLoading,
    questions,
    deleteThread,
  };
};

export default useThreads;
