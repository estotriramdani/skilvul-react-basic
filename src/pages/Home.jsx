import CustomButton from '../components/CustomButton';
import { LOGIN_INFO_LOCAL } from '../constants';
import useUserData from '../hooks/useUserData';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const userData = useUserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(LOGIN_INFO_LOCAL);

    navigate('/login')

  };
  
  return (
    <div>
      <div>
        <h1>Your info: {userData?.username}</h1>
        <CustomButton onClick={handleLogout}>⬅️ Logout</CustomButton>
      </div>
    </div>
  );
};

export default HomePage;
