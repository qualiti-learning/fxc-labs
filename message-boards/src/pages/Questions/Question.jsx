import { useContext, useState } from 'react';
import {
  useToast,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';

import { supabase } from '../../services/supabase';
import { AppContext } from '../../context/AppContext';

function Question() {
  const [answer, setAnswer] = useState('');
  const { session } = useContext(AppContext);

  const { MBMessages, MBThread, setMBMessages } = useOutletContext();

  const toast = useToast();

  async function onAnswerThread() {
    const { data, error } = await supabase
      .from('MBMessage')
      .insert({
        body: answer,
        thread_id: MBThread.id,
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

    setAnswer('');
  }

  async function updateMBMessage(mbMessage) {
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
  }

  async function deleteMBMessage(id) {
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
  }

  if (!MBThread) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Heading>{MBThread.title}</Heading>
      <Text mt={5}>{MBThread.body}</Text>
      <Text mt={5}>{MBThread.user_id}</Text>

      <Divider my={4} />

      <Heading my={4} size="lg">
        Answers ({MBMessages.length})
      </Heading>

      {MBMessages.map((MBMessage, index) => {
        const messageCreatedByMe = MBMessage.user_id === session?.user?.id;

        return (
          <Card mb={4} key={index}>
            <CardBody>
              <span>{MBMessage.body}</span>

              {messageCreatedByMe && (
                <Box mt={4}>
                  <Button
                    colorScheme="facebook"
                    size="sm"
                    onClick={() => updateMBMessage(MBMessage)}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    ml={3}
                    onClick={() => {
                      deleteMBMessage(MBMessage.id);
                    }}
                    size="sm"
                  >
                    Remove
                  </Button>
                </Box>
              )}
            </CardBody>
          </Card>
        );
      })}

      {session && (
        <Box my={10}>
          <Heading size="md">My Answer...</Heading>
          <Textarea
            mt={4}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="How can you help me?"
            value={answer}
          />
          <Button
            colorScheme="facebook"
            isDisabled={!answer.trim()}
            mt={3}
            onClick={onAnswerThread}
          >
            Answer
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Question;
