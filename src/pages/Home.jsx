import { useContext } from 'react';
import CustomButton from '../components/CustomButton';
import AppContext from '../contexts/AppContext';

const HomePage = () => {
  const ctx = useContext(AppContext);

  return (
    <div>
      <div>
        <h1>Your info: {ctx.userData.username}</h1>
        <CustomButton onClick={ctx.handleLogout}>⬅️ Logout</CustomButton>
      </div>
    </div>
  );
};

export default HomePage;
