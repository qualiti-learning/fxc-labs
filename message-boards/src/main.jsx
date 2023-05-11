import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';

import MessageBoardRouter from './Router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <MessageBoardRouter />
  </ChakraProvider>
);
