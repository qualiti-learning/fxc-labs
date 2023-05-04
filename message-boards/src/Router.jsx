import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Questions from './pages/Questions';
import QuestionsCreate from './pages/Questions/Create';
import Question from './pages/Questions/Question';

function MessageBoardRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Welcome...</h1>} />
        <Route path="questions" element={<Outlet />}>
          <Route element={<Questions />} index />
          <Route path="create" element={<QuestionsCreate />} />
          <Route path=":id" element={<Question />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MessageBoardRouter;
