import { Outlet } from 'react-router-dom';
import { QuestionsList } from '../../components/Card';

function Questions() {
  return (
    <>
      <QuestionsList />
      <Outlet />
    </>
  );
}

export default Questions;
