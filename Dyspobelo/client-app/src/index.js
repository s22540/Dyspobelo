import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
