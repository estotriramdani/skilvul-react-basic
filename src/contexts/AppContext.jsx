/* eslint-disable no-unused-vars */
/* 
# What is context

KBBI:
konteks/kon·teks/ /kontéks/ n (1 Ling) bagian suatu uraian atau kalimat yang dapat mendukung atau menambah kejelasan makna; 2 situasi yang ada hubungannya dengan suatu kejadian: 

Contoh analogi:
Unjuk rasa => kebijakan
untuk tahu kebijakan yang diprotes, kita tidak perlu jadi pemerintah atau pembuat kebijakan, bisa tahu dari posternya

Contoh di react

context => { isOpenToggle: true }

agar component tahu konteksnya, kita perlu provider (sama seperti poster).

Provider adalah component. Dalam hal unjuk rasa, poster merupakan component nya.

Poster harus dibentangkan. Kalau Provider component, jadikan dia parent semua component yang ada di aplikasi kita.

<AppContextProvider>
  <Navbar />
</AppContextProvider>

*
*/

import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { LOGIN_INFO_LOCAL } from '../constants';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext({
  userData: null,
  handleLogin: (username, password) => {},
  handleLogout: () => {},
  todos: [],
  isLoading: true,
});

export default AppContext;

export const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // dapatkan login info untuk memastikan user tersebut sudah login atau belum
    const loginLocal = localStorage.getItem(LOGIN_INFO_LOCAL);

    if (loginLocal) {
      const parsed = JSON.parse(loginLocal);
      setUserData({ username: parsed.username });
    } else {
      setUserData(null);
    }
  }, []);

  const handleLogin = (username, password) => {
    // set data login (yang dikirim dari backend di real case) ke localStorage untuk digunakan sebagai authentication. Simpan ke localStorage sebagai string
    localStorage.setItem(LOGIN_INFO_LOCAL, JSON.stringify({ username, password }));
    setUserData({
      username,
      password,
    });
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem(LOGIN_INFO_LOCAL);
    setUserData(null);
    navigate('/login');
  };

  // proses autentikasi
  useEffect(() => {
    if (userData !== undefined && userData === null) {
      navigate('/login');
    }

    if (userData !== undefined && userData !== null && window.location.href.includes('/login')) {
      navigate('/');
    }
  }, [userData]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('https://6527e890931d71583df19400.mockapi.io/api/todos');
      if (response.ok) {
        const responseJson = await response.json();
        setTodos(responseJson);
      }
      setIsLoading(false);
    };
    fetchTodos();
  }, []);

  return (
    <AppContext.Provider
      value={{
        userData: userData,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        todos: todos,
        isLoading: isLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
