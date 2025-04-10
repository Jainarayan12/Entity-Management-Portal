import { createContext, useContext } from 'react';
import SecureStorage from 'secure-web-storage';
import CryptoJS from 'crypto-js';
import PropTypes from 'prop-types';

const SECRET_KEY = 'vgLc8-oUFk]h5dgf9ATd9_Gams[XulAn';

const secureStorage = new SecureStorage(localStorage, {
  
  hash: function hash(key) {
    key = CryptoJS.SHA256(key, SECRET_KEY);
    return key.toString();
  },

  encrypt: function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    return data.toString();
  },

  decrypt: function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return data.toString(CryptoJS.enc.Utf8);
  },
});

const SecureStorageContext = createContext();

export const SecureStorageProvider = ({ children }) => {
  const setItem = (key, value) => {
    secureStorage.setItem(key, value);
  };

  const getItem = (key) => {
    const value = secureStorage.getItem(key);
    return value;
  };

  const removeItem = (key) => {
    secureStorage.removeItem(key);
  };

  return (
    <SecureStorageContext.Provider value={{ setItem, getItem, removeItem }}>
      {children}
    </SecureStorageContext.Provider>
  );
};

SecureStorageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSecureStorage = () => useContext(SecureStorageContext);
