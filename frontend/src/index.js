import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './Contexts/ThemeContext'
import Background from "./Theme/Background"
import App from './App';
import './Assets/Styles/Index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Background>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Background>
    </BrowserRouter>
  </React.StrictMode>
);