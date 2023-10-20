import CustomButton from '../components/CustomButton';

const HomePage = () => {
  const handleLogout = () => {};
  
  return (
    <div>
      <div>
        <h1>Your email: {"estolagi@gmail.com"}</h1>
        <CustomButton onClick={handleLogout}>⬅️ Logout</CustomButton>
      </div>
    </div>
  );
};

export default HomePage;
