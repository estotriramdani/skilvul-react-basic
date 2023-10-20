import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import useUserData from './hooks/useUserData';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound';

export default function App() {
  const userData = useUserData();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userData ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!userData ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}
