import { createContext, useContext, useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import PropTypes from 'prop-types';
import { useSecureStorage } from '../core/utils/SecureStorage';
import { jwtDecode } from 'jwt-decode';
import Loader from '../components/common/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const AuthContext = createContext();
const LoaderContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const { getItem, setItem } = useSecureStorage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState('Portuguese');
  const [userType, setUserType] = useState(null);
  const [userID, setUserID] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    const initializeAuth = async () => {
      const account = instance.getActiveAccount();
      const token = getItem('accessToken');
      const refreshToken = getItem('refreshToken');
      if (account || token) {
        const decodeToken = jwtDecode(token);
        setItem('userDetails', JSON.stringify(decodeToken));
        setItem('accessToken', token);
        setItem('refreshToken', refreshToken);
        setIsAuthenticated(true);
        setUserType(decodeToken.roles[0]?.name);
        setUserID(decodeToken.roles[0]?.role_code);
        setLanguage(decodeToken.masterLangDto?.langName);
        i18n.changeLanguage(decodeToken.masterLangDto?.langName);
        navigate('/dashboard');
      }
      setLoading(false);
    };
    initializeAuth();
  }, [instance]);

  const logout = () => {
    setIsAuthenticated(false);
    i18n.changeLanguage('Portuguese');
    localStorage.clear();
  };

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  return (
    <AuthContext.Provider
      value={{
        setIsAuthenticated,
        isAuthenticated,
        logout,
        userType,
        setUserType,
        userID,
        setUserID,
        language,
        setLanguage,
        setImageUrl,
        imageUrl,
      }}
    >
      <LoaderContext.Provider value={{ loading, setLoading }}>
        {children}
      </LoaderContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useLoader = () => useContext(LoaderContext);

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
