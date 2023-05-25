import { useEffect, useState, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

import { supabase } from '../services/supabase';

// eslint-disable-next-line no-undef
const NODE_ENV = process.env.NODE_ENV;

const useThreads = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getThreads() {
      const { data, error } = await supabase.from('MBThread').select('*');

      return {
        data,
        error,
      };
    }

    getThreads()
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

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
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== id)
        );
      }
    },
    [toast]
  );

  return {
    loading,
    questions,
    deleteThread,
  };
};

export default useThreads;
