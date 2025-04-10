import { useAuth, useLoader } from '../../context/AuthProvider';
import { API_ENDPOINTS } from '../utils/apiEndpoints';
import useApi from './useApi';
import { useSecureStorage } from '../utils/SecureStorage';
import { jwtDecode } from 'jwt-decode';
import i18n from 'i18next';

const RefreshToken = () => {
  const { getItem, setItem } = useSecureStorage();
  const { setUserType, setLanguage, setIsAuthenticated } = useAuth();
  const { setLoading } = useLoader();
  const { post } = useApi();

  const refresh = async () => {
    try {
      const userDetails = getItem('userDetails');
      const userDetail = JSON.parse(userDetails);
      const refreshToken = getItem('refreshToken');
      if (!refreshToken) {
        localStorage.clear();
        window.location.href = '/';
        return null;
      }
      setLoading(true);
      const payload = {
        refreshToken: refreshToken.replace('Bearer ', ''),
        userId: userDetail.id,
      };

      const tokenData = await post(
        `${API_ENDPOINTS.auth.refreshToken}`,
        payload,
      );

      if (tokenData?.status === 200) {
        setLoading(false);
        const token = jwtDecode(tokenData.data?.access_token);
        setItem('userDetails', JSON.stringify(token));
        setItem('accessToken', tokenData.data?.access_token);
        setItem('refreshToken', tokenData.data?.refresh_token);
        setIsAuthenticated(true);
        setUserType(token.roles[0]?.name);
        setLanguage(token.masterLangDto.langName);
        i18n.changeLanguage(token.masterLangDto.langName);
        return tokenData.data?.access_token;
      } else {
        setLoading(false);
        throw new Error('refresh token failed');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      setLoading(false);
      localStorage.clear();
      window.location.href = '/';
      return null;
    }
  };

  return refresh;
};

export default RefreshToken;
