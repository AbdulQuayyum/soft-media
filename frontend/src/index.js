import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from './Contexts/ThemeContext'
import Background from "./Theme/Background"
import App from './App';
import './Assets/Styles/Index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}>
      <BrowserRouter>
        <Background>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Background>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);