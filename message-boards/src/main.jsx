import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';

import MessageBoardRouter from './Router.jsx';
import AppContextProvider from './context/AppContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <AppContextProvider>
      <MessageBoardRouter />
    </AppContextProvider>
  </ChakraProvider>
);
