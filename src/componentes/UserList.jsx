import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3001/usuarios'); // Atualize para a porta 3000
        if (!response.ok) {
          throw new Error('Erro na rede');
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };


    fetchUsuarios();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.cpf}>{usuario.name}</li> // Ajuste a propriedade conforme o formato dos dados
        ))}
      </ul>
    </div>
  );
};

export default UserList;
