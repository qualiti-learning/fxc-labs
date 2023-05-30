import { Heading, Text } from '@chakra-ui/react';

const QuestionHeadline = ({ MBThread }) => (
  <>
    <Heading>{MBThread.title}</Heading>
    <Text mt={5}>{MBThread.body}</Text>
    <Text mt={5}>{MBThread.user_id}</Text>
  </>
);

export default QuestionHeadline;
