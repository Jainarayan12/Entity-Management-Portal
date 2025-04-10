import AppRoutes from './routes/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Toast from './components/common/Toast/Toast';
import { SecureStorageProvider } from './core/utils/SecureStorage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <SecureStorageProvider>
      <Router>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <div className="border-none layout-main-container">
              <Toast />
              <AppRoutes />
            </div>
          </AuthProvider>
        </LocalizationProvider>
      </Router>
    </SecureStorageProvider>
  );
}

export default App;
