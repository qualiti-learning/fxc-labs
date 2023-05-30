import { Box, Heading, Textarea, Button } from '@chakra-ui/react';
import { useState } from 'react';

const QuestionReply = ({ addMBMessage }) => {
  const [answer, setAnswer] = useState('');

  return (
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
        onClick={() => addMBMessage(answer).then(() => setAnswer(''))}
      >
        Answer
      </Button>
    </Box>
  );
};

export default QuestionReply;
