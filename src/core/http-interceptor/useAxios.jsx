import { useEffect } from 'react';
import axiosInstance from './axios-instance';
import { toastError } from '../../components/common/Toast/Toast';
import RefreshToken from '../api-service/refreshToken';

const useAxios = () => {
  const refresh = RefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const token = config.headers?.Authorization;
        if (config.headers['X-Skip-Interceptor']) {
          delete config.headers['X-Skip-Interceptor'];
          return config;
        }
        if (token) {
          config.headers.Authorization = token;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.status !== 200) {
          if (
            (error.status === 401 || error.status === 403) &&
            !originalRequest._retry
          ) {
            originalRequest._retry = true;
            const token = await refresh();
            if (token) {
              return axiosInstance(error.config);
            } else {
              localStorage.clear();
              window.location.href = '/';
              return Promise.reject(error);
            }
          } else if (error.status === 500) {
            toastError(error?.message);
          } else {
            if (error.status === 401 || error.status === 403) {
              //no toast
            } else {
              toastError(error?.message);
            }
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosInstance;
};

export default useAxios;
