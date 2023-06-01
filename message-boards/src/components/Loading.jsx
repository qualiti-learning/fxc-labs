import { Box, Spinner } from '@chakra-ui/react';

const Loading = (props) => (
  <Box display="flex" justifyContent="center" {...props}>
    <Spinner size="xl" />
  </Box>
);

export default Loading;
