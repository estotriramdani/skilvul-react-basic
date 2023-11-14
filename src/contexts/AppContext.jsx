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
import toast from 'react-hot-toast';

const API_URL = `${import.meta.env.VITE_API_URL}/todos`;

console.log(API_URL)

const AppContext = createContext({
  userData: null,
  handleLogin: (username, password) => {},
  handleLogout: () => {},
  todos: [],
  isLoading: true,
  handleAddTodo: async (todo, fileUrl) => {},
  handleDeleteTodo: async (id) => {},
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
      setUserData(parsed);
    } else {
      setUserData(null);
    }
  }, []);

  const handleLogin = async (username, password) => {
    // set data login (yang dikirim dari backend di real case) ke localStorage untuk digunakan sebagai authentication. Simpan ke localStorage sebagai string
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      toast.error('Username atau password salah');
      return;
    }

    const responseJson = await response.json();

    localStorage.setItem(LOGIN_INFO_LOCAL, JSON.stringify(responseJson));

    setUserData(responseJson);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem(LOGIN_INFO_LOCAL);
    setUserData(null);
    navigate('/login');
  };

  const handleAddTodo = async (todo, fileUrl) => {
    setIsLoading(true);
    try {
      const body = {
        id: new Date().getTime().toString(),
        todo: todo,
        attachment: fileUrl,
        createdAt: new Date().toISOString(),
      };
      const response = await fetch(API_URL, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
      });
      if (response.ok) {
        const responseJson = await response.json();
        setTodos([...todos, responseJson]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userData.token}`,
        }
      });
      if (response.ok) {
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
      const response = await fetch(API_URL);
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
        isLoading: isLoading,
        handleAddTodo: handleAddTodo,
        handleDeleteTodo: handleDelete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
