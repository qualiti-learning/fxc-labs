import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { SWRConfig } from 'swr';

import MessageBoardRouter from './Router.jsx';
import AppContextProvider from './context/AppContext.jsx';

function localStorageProvider() {
  const map = new Map(
    JSON.parse(localStorage.getItem('@fxc-labs/swr') || '[]')
  );

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('@fxc-labs/swr', appCache);
  });

  return map;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <SWRConfig
    value={{
      revalidateOnFocus: false,
      provider: localStorageProvider,
    }}
  >
    <ChakraProvider>
      <AppContextProvider>
        <MessageBoardRouter />
      </AppContextProvider>
    </ChakraProvider>
  </SWRConfig>
);
