import {
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  StackDivider,
  Text,
  Stack,
} from '@chakra-ui/react';

const questions = [
  {
    id: 1,
    heading: 'Summary',
    description: 'View a summary of all your clients over the last month.',
  },
  {
    id: 2,
    heading: 'Summary',
    description: 'View a summary of all your clients over the last month.',
  },
  {
    id: 3,
    heading: 'Summary',
    description: 'View a summary of all your clients over the last month.',
  },
];

export function QuestionsList() {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Questions</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {questions.map((question, index) => {
            return (
              <Box key={index}>
                <Heading size="xs" textTransform="uppercase">
                  {question.heading}
                </Heading>
                <Text pt="2" fontSize="sm">
                  {question.description}
                </Text>
              </Box>
            );
          })}
        </Stack>
      </CardBody>
    </Card>
  );
}
