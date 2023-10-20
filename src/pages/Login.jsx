import { useState } from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { LOGIN_INFO_LOCAL } from '../constants';
// import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

const LoginPage = () => {

  // ambil login info dari local storage
  const userData = useUserData();
  console.log("🚀 ~ file: Login.jsx:12 ~ LoginPage ~ userData:", userData)
  
  // siapkan state untuk menampung username dan password yang diinputkan oleh user
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: fetch API Login and save the response to localStorage

    // set data login (yang dikirim dari backend di real case) ke localStorage untuk digunakan sebagai authentication. Simpan ke localStorage sebagai string
    localStorage.setItem(LOGIN_INFO_LOCAL, JSON.stringify({ username, password }));

    // navigate ke halaman `/`
    // navigate('/')
    // TODO: change it with navigate after learning about React Context
    window.location.href = '/'
  };

  return (
    <div className="flex justify-center items-center p-6">
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
  );
};

export default LoginPage;
