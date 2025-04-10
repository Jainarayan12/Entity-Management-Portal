import { PublicClientApplication } from '@azure/msal-browser';
 
 
 export const msalConfig = {
   auth: {
     clientId: import.meta.env.VITE_CLIENT_ID,
     authority: 'https://login.microsoftonline.com/5e007b6c-258b-4fde-adc1-8bf8a135885d', 
     redirectUri: import.meta.env.VITE_REDIRECT_URL, 
   },
   cache: {
     cacheLocation: 'localStorage', 
     storeAuthStateInCookie: true, 
   },
 };
 console.log("import.meta.env.VITE_CLIENT_ID",msalConfig)
 export const msalInstance = new PublicClientApplication(msalConfig);