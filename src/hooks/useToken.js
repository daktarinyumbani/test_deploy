import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const token = userToken ? userToken.token : null;
    return token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    console.log('Setting the token here');
    console.log(userToken);
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token.plainTextToken);
  };

  return {
    setToken: saveToken,
    token
  };
}
