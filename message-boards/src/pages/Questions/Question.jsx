import { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';

import { supabase } from '../../services/supabase';

function Question() {
  const [answer, setAnswer] = useState('');
  const [MBMessages, setMBMessages] = useState([]);
  const [MBThread, setMBThread] = useState();

  const toast = useToast();
  const { slug } = useParams();

  useEffect(() => {
    async function getMessages(threadId) {
      const { data, error } = await supabase
        .from('MBMessage')
        .select('*')
        .filter('thread_id', 'eq', threadId);

      return { data, error };
    }

    async function getThread() {
      const { data, error } = await supabase
        .from('MBThread')
        .select('*')
        .filter('slug', 'eq', slug);

      return { data, error };
    }

    getThread()
      .then(({ data }) => {
        const thread = data[0];

        setMBThread(thread);

        return getMessages(thread.id);
      })
      .then(({ data }) => setMBMessages(data));
  }, [slug]);

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

    console.log(data);

    setMBMessages([...MBMessages, data[0]]);

    toast({
      position: 'bottom-right',
      status: 'success',
      title: 'Great! Your Answer was created.',
    });

    setAnswer('');
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

      {MBMessages.map((MBMessage, index) => (
        <Card mb={4} key={index}>
          <CardBody>{MBMessage.body}</CardBody>
        </Card>
      ))}

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
    </Box>
  );
}

export default Question;
