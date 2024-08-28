import React, { useState } from 'react';
import Header from '../componentes/Header';
import { useNavigate } from 'react-router-dom'; 
import './SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.error || 'Erro ao cadastrar usuário');
      } else {
        // Redirecionar para a página de itens após o cadastro bem-sucedido
        navigate('/itens');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setErrorMessage('Erro ao cadastrar usuário');
    }
  };

  return (
    <div className="signup-page">
      <Header />
      <main>
        <h1>MARKETMATCH</h1>
        <h2>COMPRA INTELIGENTE</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome</label>
          <input 
            type="text" 
            name="nome" 
            value={formData.nome} 
            onChange={handleInputChange} 
            required 
          />
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
          />
          <label>Senha</label>
          <input 
            type="password" 
            name="senha" 
            value={formData.senha} 
            onChange={handleInputChange} 
            required 
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Cadastrar</button>
        </form>
      </main>
    </div>
  );
};

export default SignupPage;
