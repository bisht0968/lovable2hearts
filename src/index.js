import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import './index.css';

import App from './App';
import { AppProvider } from './utils/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-bmvd2r2gthsirq5d.us.auth0.com"
      clientId="kQgIfXEvVRX77ffpw7FjyjokFec5NSJZ"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <AppProvider>
        <App />
      </AppProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
