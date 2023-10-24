import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
