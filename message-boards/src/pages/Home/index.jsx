import { useContext, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../services/supabase';
import { Container, Spinner } from '@chakra-ui/react';
import { AppContext } from '../../context/AppContext';

export default function Home() {
  const { loading, session } = useContext(AppContext);

  useEffect(() => {
    document.title = 'Home | Message Boards';
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (session) {
    return (
      <>
        <span>Logged in! {session?.user?.email}</span>

        <button onClick={() => supabase.auth.signOut()}>Logout</button>
      </>
    );
  }

  return (
    <Container>
      <Auth
        providers={[]}
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
      />
    </Container>
  );
}
