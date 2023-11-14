import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { AppContextProvider } from '../contexts/AppContext';
import Navbar from '../components/Navbar';

const RootPage = () => {
  return (
    <AppContextProvider>
      <div className="min-h-screen bg-gray-800">
        <Navbar />
        <Outlet />
      </div>
      <Toaster />
    </AppContextProvider>
  );
};

export default RootPage;
