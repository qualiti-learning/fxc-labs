import { Outlet, useParams } from 'react-router-dom';

import { useThread } from '../../hooks/useThread';
import Loading from '../../components/Loading';

const QuestionOutlet = () => {
  const { slug } = useParams();

  const [MBThread, setMBThread] = useThread(slug);

  if (!MBThread) {
    return <Loading />;
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
