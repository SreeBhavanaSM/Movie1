import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root and render the App component
const root = createRoot(container);
root.render(<App />);
