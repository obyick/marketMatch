import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import './MatchPage.css';

const MatchPage = () => {
  const location = useLocation();
  const { MarketMaisBarato, menorPreco } = location.state || {};

  return (
    <div className="match-page">
      <Header />
      <main>
        <h1>SEU MATCH FOI COM</h1>
        <h2>{MarketMaisBarato || 'Nenhum supermercado encontrado'}</h2>
        {menorPreco !== undefined && <p>Total: R${menorPreco.toFixed(2)}</p>}
      </main>
      <Footer />
    </div>
  );
};

export default MatchPage;
