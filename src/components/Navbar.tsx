import React, { useContext } from 'react';
import CustomButton from './CustomButton';
import AppContext from '../contexts/AppContext';

const Navbar = () => {
  const { handleLogout, userData } = useContext(AppContext);

  return (
    <nav className="p-3 bg-slate-900 text-white flex justify-between items-center fixed top-0 w-full shadow">
      <h1 className="text-white text-xl font-bold">MovieApp</h1>
      {userData !== null && <CustomButton onClick={handleLogout}>Logout</CustomButton>}
    </nav>
  );
};

export default Navbar;
