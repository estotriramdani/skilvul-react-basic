import { useContext, useState } from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AppContext from '../contexts/AppContext';

const LoginPage = () => {
  const ctx = useContext(AppContext);

  // siapkan state untuk menampung username dan password yang diinputkan oleh user
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: fetch API Login and save the response to localStorage

    ctx.handleLogin(username, password);
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="p-4 bg-gray-500 rounded-lg">
        <form onSubmit={handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Username/Email"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <CustomInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <CustomButton type="submit">➡️ Login</CustomButton>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
