import { createContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ loading, session }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
