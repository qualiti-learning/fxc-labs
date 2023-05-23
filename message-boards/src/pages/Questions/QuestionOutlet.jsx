import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { supabase } from '../../services/supabase';

const QuestionOutlet = () => {
  const [MBThread, setMBThread] = useState();
  const [MBMessages, setMBMessages] = useState([]);

  const { slug } = useParams();

  useEffect(() => {
    async function getMessages(threadId) {
      const { data, error } = await supabase
        .from('MBMessage')
        .select('*')
        .filter('thread_id', 'eq', threadId);

      return { data, error };
    }

    async function getThread() {
      const { data, error } = await supabase
        .from('MBThread')
        .select('*')
        .filter('slug', 'eq', slug);

      return { data, error };
    }

    getThread()
      .then(({ data }) => {
        const thread = data[0];

        setMBThread(thread);

        return getMessages(thread.id);
      })
      .then(({ data }) => setMBMessages(data));
  }, [slug]);

  return (
    <div>
      <Outlet
        context={{
          MBMessages,
          MBThread,
          setMBMessages,
          setMBThread,
        }}
      />
    </div>
  );
};

export default QuestionOutlet;
