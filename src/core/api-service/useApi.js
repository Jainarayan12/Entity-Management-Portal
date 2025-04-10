import { useState } from 'react';
import axiosInstance from '../http-interceptor/axios-instance';
import { useSecureStorage } from '../utils/SecureStorage';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getItem } = useSecureStorage();
  const token = getItem('accessToken');
  const apiCall = async (method, url, data = null, headers) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance({
        method,
        url,
        data,
        headers: headers?.['X-Skip-Interceptor']
          ? { 'X-Skip-Interceptor': true }
          : { Authorization: `${token}` },
      });
      return response;
    } catch (err) {
      setError(err);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const get = (url, headers = {}) => apiCall('get', url, null, headers);
  const post = (url, data, headers = {}) => apiCall('post', url, data, headers);
  const put = (url, data, headers = {}) => apiCall('put', url, data, headers);
  const del = (url, data, headers = {}) =>
    apiCall('delete', url, data, headers);

  return { get, post, put, del, loading, error };
};

export default useApi;
