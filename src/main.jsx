import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import HomePage from './pages/Home';
import './index.css';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import NotFoundPage from './pages/NotFound.jsx';
// import RootPage from './templates/root.jsx';
// import LoginPage from './pages/Login';
import App from './App';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootPage />,
//     errorElement: <NotFoundPage />,
//     children: [
//       {
//         path: '/',
//         element: <HomePage />,
//       },
//     ],
//   },
//   {
//     path: '/login',
//     element: <LoginPage />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
