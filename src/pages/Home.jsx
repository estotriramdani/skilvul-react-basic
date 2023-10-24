import { useContext } from 'react';
import AppContext from '../contexts/AppContext';

const HomePage = () => {
  const ctx = useContext(AppContext);

  return (
    <div>
      <div>
        <h1>Your info: {ctx.userData?.username}</h1>
      </div>
    </div>
  );
};

export default HomePage;
