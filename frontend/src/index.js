import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from './Contexts/ThemeContext'
import Background from "./Theme/Background"
import App from './App';
import './Assets/Styles/Index.css';

// console.log(`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`)

const root = ReactDOM.createRoot(document.getElementById('root'));
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