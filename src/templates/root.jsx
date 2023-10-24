import { Outlet } from 'react-router-dom';
import { AppContextProvider } from '../contexts/AppContext';

const RootPage = () => {
  return (
    <AppContextProvider>
      <div>
        <nav className="p-3 bg-slate-900 text-white">this is nav</nav>
        <Outlet />
      </div>
    </AppContextProvider>
  );
};

export default RootPage;
