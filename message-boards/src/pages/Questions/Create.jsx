import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../../services/supabase';
import { slugify } from '../../utils';

// eslint-disable-next-line no-undef
const NODE_ENV = process.env.NODE_ENV;

function QuestionsCreate() {
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  async function createQuestion() {
    setLoading(true);

    const { error } = await supabase.from('MBThread').insert({
      body,
      slug: slugify(title),
      title,
    });

    if (error) {
      setLoading(false);

      const errorMessage =
        NODE_ENV === 'development'
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

    setLoading(false);

    toast({
      description: 'You will be redirected to Questions Page',
      position: 'bottom-right',
      status: 'success',
      title: 'Great! Your Thread was created.',
    });

    navigate('/questions');
  }

  const isFormValid = title.trim().length && body.trim().length;

  return (
    <>
      <Heading mb={10}>New Question...</Heading>

      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input onChange={(event) => setTitle(event.target.value)} type="text" />
      </FormControl>

      <FormControl my={4}>
        <FormLabel>Body</FormLabel>
        <Textarea onChange={(event) => setBody(event.target.value)} rows={10} />
      </FormControl>

      <Button onClick={() => navigate('/questions')}>Cancel</Button>

      <Button
        ml={4}
        isDisabled={!isFormValid}
        loadingText="Saving..."
        isLoading={loading}
        onClick={createQuestion}
        variant="solid"
        colorScheme="messenger"
      >
        Save
      </Button>
    </>
  );
}

export default QuestionsCreate;
