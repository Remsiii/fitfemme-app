import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import './i18n.ts';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Router>
  </StrictMode>,
)
