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
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { Link } from 'react-router-dom';

export default function QuestionsList() {
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

  return (
    <Card flex={true}>
      <Button as={Link} to="/questions/create">
        Add Question
      </Button>

      <CardHeader>
        <Heading size="md">Questions</Heading>
      </CardHeader>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {questions.map((question, index) => {
              return (
                <Box key={index}>
                  <Heading size="xs" textTransform="uppercase">
                    {question.title}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {question.body}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        </CardBody>
      )}
    </Card>
  );
}
