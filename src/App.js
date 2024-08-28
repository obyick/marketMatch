import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from './telas/Home'
import Itens from './telas/Itens'
import MatchPage from './telas/MatchPage';
import SignupPage from './telas/SignupPage';
import LoginPage from './telas/Login';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<SignupPage />} />
      <Route path="/match" element={<MatchPage />} />
      <Route path="/itens" element={<Itens />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Opcional: Rota para 404 */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  </Router>
);

export default App;