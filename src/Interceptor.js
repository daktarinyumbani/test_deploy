/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import { useStore, useActions } from "./Store";
import axios from 'axios';

// let's pretend the company is called ACME
export const isACMEDomain = (url) => {
  return /^([^/]+:)?\/{2,3}[^/]+?(\.ACME\.com|\.acme)(:|\/|$)/i.test(url);
};

function Interceptor() {
  //   const { auth } = useStore();
  //   const actions = useActions();
  const [errorInterceptor, setErrorInterceptor] = useState(undefined);
  const [authInterceptor, setAuthInterceptor] = useState(undefined);

  let token = window.localStorage.getItem('token');
  let theToken = JSON.parse(token);

  const addAuthInterceptor = () => {

    const authInterceptor = axios.interceptors.request.use(
      (config) => {
        // console.log('check auth header');
        if (theToken) {
          if (!config.headers.hasOwnProperty('Authorization')) {
            // console.log('no auth header');
            //   if (auth.accessToken && isACMEDomain(config.url)) {
            config.headers.Authorization =
              'Bearer ' + theToken.token.plainTextToken;
            //   }
          } else if (!config.headers.Authorization) {
            delete config.headers.Authorization;
          }
        } else {
          console.log('no token11');
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    setAuthInterceptor(authInterceptor);
  };

  const removeAuthInterceptor = () => {
    axios.interceptors.request.eject(authInterceptor);
    setAuthInterceptor(undefined);
  };

  const addErrorInterceptor = () => {
    const errorInterceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
          const code = error.response.status;
          if (code === 401) {
            // actions.auth.promptToSignIn();
            // localStorage.clear();
            // window.location.href = '/';
            // window.location.reload();
          } else {
            let message = 'Something went wrong.';
            if (code === 403) {
              message = 'You’re not authorized to do that.';
            } else if (error.message) {
              message = error.message;
            }
            // actions.notifications.showNotifications(message);
          }
        }
        return Promise.reject(error);
      }
    );
    setErrorInterceptor(errorInterceptor);
  };

  const removeErrorInterceptor = () => {
    axios.interceptors.request.eject(errorInterceptor);
    setErrorInterceptor(undefined);
  };

  useEffect(() => {
    addAuthInterceptor();
    addErrorInterceptor();
    return () => {
      removeAuthInterceptor();
      removeErrorInterceptor();
    };
  }, []);

  return <React.Fragment />;
}

export default Interceptor;
