import { useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import useSWR from 'swr';

import { supabase } from '../services/supabase';

async function getMessages({ threadId }) {
  const { data, error } = await supabase
    .from('MBMessage')
    .select('*')
    .filter('thread_id', 'eq', threadId);

  if (error) {
    throw new Error(error);
  }

  return data;
}

export const useMessages = (threadId) => {
  const toast = useToast();

  const { data: MBMessages = [], mutate } = useSWR(
    {
      key: '/messages',
      threadId,
    },
    getMessages
  );

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

      mutate(
        (prevMBMessages) =>
          prevMBMessages.filter((mbMessage) => mbMessage.id !== id),
        { revalidate: false }
      );

      toast({
        position: 'bottom-right',
        status: 'success',
        title: 'Great! Your Answer was deleted.',
      });
    },
    [toast, mutate]
  );

  const updateMBMessage = useCallback(
    async (mbMessage) => {
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

      mutate(
        (prevMBMessages) =>
          prevMBMessages.map((message) => {
            if (mbMessage.id === message.id) {
              return data[0];
            }

            return message;
          }),
        { revalidate: false }
      );
    },
    [mutate]
  );

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

      mutate([...MBMessages, data[0]], { revalidate: false });

      toast({
        position: 'bottom-right',
        status: 'success',
        title: 'Great! Your Answer was created.',
      });
    },
    [MBMessages, mutate, threadId, toast]
  );

  return {
    MBMessages,
    addMBMessage,
    updateMBMessage,
    deleteMBMessage,
  };
};
