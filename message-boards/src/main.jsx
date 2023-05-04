import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';

import MessageBoardRouter from './Router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <MessageBoardRouter />
    </ChakraProvider>
  </React.StrictMode>
);
