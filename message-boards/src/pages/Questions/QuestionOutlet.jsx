import { Outlet, useParams } from 'react-router-dom';
import { useThread } from '../../hooks/useThread';
import { Box, Spinner } from '@chakra-ui/react';

const QuestionOutlet = () => {
  const { slug } = useParams();

  const [MBThread, setMBThread] = useThread(slug);

  if (!MBThread) {
    return (
      <Box display="flex" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Outlet
      context={{
        MBThread,
        setMBThread,
      }}
    />
  );
};

export default QuestionOutlet;
