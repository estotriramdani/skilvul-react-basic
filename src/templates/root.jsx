import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

const RootPage = () => {
  const userData = useUserData();
  const navigate = useNavigate();

  console.log(userData);

  // useEffect(() => {
  //   if (userData === null) {
  //     navigate('/login')
  //   }
  // }, [userData]);

  return (
    <div>
      <nav className="p-3 bg-slate-900 text-white">this is nav</nav>
      <Outlet />
    </div>
  );
};

export default RootPage;
