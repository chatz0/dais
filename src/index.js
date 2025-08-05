// src/index.js
import 'aframe';                // <-- AFRAME global
import 'aframe-extras';         // <-- checkpoint-controls, etc.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
