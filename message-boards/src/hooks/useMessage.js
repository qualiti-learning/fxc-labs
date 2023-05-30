import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { useToast } from '@chakra-ui/react';

export const useMessages = (threadId) => {
  const [MBMessages, setMBMessages] = useState([]);
  const toast = useToast();

  useEffect(() => {
    async function getMessages(threadId) {
      const { data, error } = await supabase
        .from('MBMessage')
        .select('*')
        .filter('thread_id', 'eq', threadId);
      return { data, error };
    }

    if (threadId) {
      getMessages(threadId).then(({ data }) => setMBMessages(data));
    }
  }, [threadId]);

  const deleteMBMessage = useCallback(
    async (id) => {
      const { error, data } = await supabase
        .from('MBMessage')
        .delete()
        .filter('id', 'eq', id)
        .select();

      if (error || !data.length) {
        return toast({
          description: error?.message ?? 'Unable to remove message.',
          position: 'bottom-right',
          status: 'error',
          title: 'Oops... Something went wrong',
        });
      }

      setMBMessages((prevMBMessages) =>
        prevMBMessages.filter((mbMessage) => mbMessage.id !== id)
      );

      toast({
        position: 'bottom-right',
        status: 'success',
        title: 'Great! Your Answer was deleted.',
      });
    },
    [toast]
  );

  const updateMBMessage = useCallback(async (mbMessage) => {
    const newAnswer = prompt('Type the new answer', mbMessage.body);

    if (!newAnswer) {
      return;
    }

    const { data } = await supabase
      .from('MBMessage')
      .upsert({
        ...mbMessage,
        body: newAnswer,
      })
      .select();

    setMBMessages((prevMBMessages) =>
      prevMBMessages.map((message) => {
        if (mbMessage.id === message.id) {
          return data[0];
        }

        return message;
      })
    );
  }, []);

  const addMBMessage = useCallback(
    async (answer) => {
      const { data, error } = await supabase
        .from('MBMessage')
        .insert({
          body: answer,
          thread_id: threadId,
        })
        .select();

      if (error) {
        const errorMessage =
          // eslint-disable-next-line no-undef
          process.env.NODE_ENV === 'development'
            ? error.message
            : 'An unexpected error happened...';

        toast({
          description: errorMessage,
          position: 'bottom-right',
          status: 'error',
          title: 'Oops... Something went wrong',
        });

        return console.error(error);
      }

      setMBMessages([...MBMessages, data[0]]);

      toast({
        position: 'bottom-right',
        status: 'success',
        title: 'Great! Your Answer was created.',
      });
    },
    [MBMessages, threadId, toast]
  );

  return {
    MBMessages,
    addMBMessage,
    updateMBMessage,
    deleteMBMessage,
  };
};
