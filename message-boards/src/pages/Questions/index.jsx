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
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';
import useThreads from '../../hooks/useThreads';

export default function QuestionsList() {
  const { session } = useContext(AppContext);
  const { loading, questions, deleteThread } = useThreads();

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
