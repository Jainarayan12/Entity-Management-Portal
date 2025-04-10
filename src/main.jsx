
import React from 'react';
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/md-light-indigo/theme.css';
import 'primereact/resources/themes/mdc-light-deeppurple/theme.css';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './core/azure-login/msalConfig.js';
import theme from './theme/theme.jsx';
import { ThemeProvider } from '@mui/material/styles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
    </MsalProvider>
  </React.StrictMode>
);