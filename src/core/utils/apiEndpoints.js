const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authService = 'auth-service/';


export const API_ENDPOINTS = {
  auth: {
    token: `${VITE_API_BASE_URL}${authService}oauth/v1/token`,
    expire: `${VITE_API_BASE_URL}${authService}oauth/logOut`,
    refreshToken: `${VITE_API_BASE_URL}${authService}oauth/refreshToken`,
  },
};
