import React, { useState } from 'react';
import Header from '../componentes/Header';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }),
      });

      if (!response.ok) {
        throw new Error('Email ou senha inválidos');
      }

      const data = await response.json();
      // Redireciona para a página de itens se o login for bem-sucedido
      navigate('/itens');
    } catch (error) {
      // Exibe uma mensagem de erro se o login falhar
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <Header />
      <main>
        <h1>MARKETMATCH</h1>
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}> 
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Senha</label>
          <div className="password-container">
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i 
              className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
          <button type="submit">Entrar</button>
          {error && <p className="error">{error}</p>}
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
