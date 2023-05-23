import {
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  StackDivider,
  Text,
  Stack,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { supabase } from '../../services/supabase';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

// eslint-disable-next-line no-undef
const NODE_ENV = process.env.NODE_ENV;

export default function QuestionsList() {
  const { session } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const toast = useToast();

  const deleteThread = async (id) => {
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
  };

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

  return (
    <Card flex={true}>
      {session && (
        <Button as={Link} to="/questions/create">
          Add Question
        </Button>
      )}

      <CardHeader>
        <Heading size="md">Questions</Heading>
      </CardHeader>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {questions.map((question, index) => {
              const threadCreatedByMe = question.user_id === session?.user?.id;

              return (
                <Box key={index}>
                  <Heading
                    size="xs"
                    as={Link}
                    to={`/questions/${question.slug}`}
                    textTransform="uppercase"
                  >
                    {question.title}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {question.body}
                  </Text>

                  {session && threadCreatedByMe && (
                    <Box mt={4}>
                      <Button
                        as={Link}
                        to={`/questions/${question.slug}/update`}
                        colorScheme="facebook"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        ml={3}
                        onClick={() => deleteThread(question.id)}
                        size="sm"
                      >
                        Remove
                      </Button>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Stack>
        </CardBody>
      )}
    </Card>
  );
}
