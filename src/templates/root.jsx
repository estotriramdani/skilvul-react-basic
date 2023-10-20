import { Outlet } from 'react-router-dom';

const RootPage = () => {
  return (
    <div>
      <nav className="p-3 bg-slate-900 text-white">this is nav</nav>
      <Outlet />
    </div>
  );
};

export default RootPage;
