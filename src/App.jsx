import { useEffect, useState } from 'react';
import CustomInput from './components/CustomInput';
import { LOGIN_INFO_LOCAL } from './constants';
import CustomButton from './components/CustomButton';

export default function App() {
  // siapkan state untuk menampung username dan password yang diinputkan oleh user
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // state untuk menentukan user tersebut sudah login atau belum
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // state untuk informasi user ketika sudah login
  const [userData, setUserData] = useState({
    username: '',
  });

  /* 
    function untuk handle login (dipanggil di form.onSubmit)
    
    -- equivalent dengan kode sbb:
    document.querySelector('#form').addEventListener('submit', (event) => {
      ...rest of code
    })
  */
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: fetch API Login and save the response to localStorage

    // set data login (yang dikirim dari backend di real case) ke localStorage untuk digunakan sebagai authentication. Simpan ke localStorage sebagai string
    localStorage.setItem(LOGIN_INFO_LOCAL, JSON.stringify({ username, password }));

    // set `login` state untuk digunakan sebagai conditional rendering.
    setIsLoggedIn(true);

    // state ini akan digunakan di suatu tempat setelah user login
    setUserData({ username });
  };

  // logicnya kurang lebih sama dengan login tetapi dibalikkan
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ username: '' });
    localStorage.removeItem(LOGIN_INFO_LOCAL);
  };

  // useEffect akan dijalankan pertama kali di awal ketika user load datanya
  useEffect(() => {
    // dapatkan login info untuk memastikan user tersebut sudah login atau belum
    const loginLocal = localStorage.getItem(LOGIN_INFO_LOCAL);

    if (loginLocal) {
      setIsLoggedIn(true);
      const parsed = JSON.parse(loginLocal);
      setUserData({ username: parsed.username });
    } else {
      // do something else needed.
    }
  }, []);

  return (
    <div className="flex justify-center items-center p-6">
      {isLoggedIn ? (
        <div>
          <h1>Your email: {userData.username}</h1>
          <CustomButton onClick={handleLogout}>⬅️ Logout</CustomButton>
        </div>
      ) : (
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
      )}
    </div>
  );
}
