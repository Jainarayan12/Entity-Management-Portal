const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authService = 'auth-service/';

console.log("VITE_API_BASE_URL",VITE_API_BASE_URL)
export const API_ENDPOINTS = {
  auth: {
    token: `${VITE_API_BASE_URL}api/user/validateUser`,
    expire: `${VITE_API_BASE_URL}${authService}oauth/logOut`,
    refreshToken: `${VITE_API_BASE_URL}${authService}oauth/refreshToken`,
  },
  
};
