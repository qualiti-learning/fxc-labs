import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Questions from './pages/Questions';
import QuestionForm from './pages/Questions/Form';
import Question from './pages/Questions/Question';
import QuestionOutlet from './pages/Questions/QuestionOutlet';
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
            <Route path="create" element={<QuestionForm />} />
            <Route path=":slug" element={<QuestionOutlet />}>
              <Route index element={<Question />} />
              <Route path="update" element={<QuestionForm />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MessageBoardRouter;
