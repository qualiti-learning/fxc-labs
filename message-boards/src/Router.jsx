import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Questions from './pages/Questions';
import QuestionsCreate from './pages/Questions/Create';
import Question from './pages/Questions/Question';
import Layout from './components/Layout';
import Home from './pages/Home';

function MessageBoardRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Home />} index />

          <Route path="questions" element={<Outlet />}>
            <Route element={<Questions />} index />
            <Route path="create" element={<QuestionsCreate />} />
            <Route path=":id" element={<Question />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MessageBoardRouter;
