import { useState, useEffect } from 'react';
import { LOGIN_INFO_LOCAL } from '../constants';

export default function useUserData() {
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    // dapatkan login info untuk memastikan user tersebut sudah login atau belum
    const loginLocal = localStorage.getItem(LOGIN_INFO_LOCAL);

    if (loginLocal) {
      const parsed = JSON.parse(loginLocal);
      setUserData({ username: parsed.username });
    } else {
      setUserData(null);
    }
  }, [setUserData]);
  
  return userData;
}