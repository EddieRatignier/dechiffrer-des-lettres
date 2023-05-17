import React from 'react';
import ReactDOM from 'react-dom/client';
import Training from './pages/Training/index';
import Game from './pages/Game';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Daily from './pages/Daily/index';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);