import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import InfoBox from './InfoBox'; // Importe o componente InfoBox

const Login = () => {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailOrUsername || !password) {
      setError('Todos os campos são obrigatórios');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/login.php', {
        method: 'POST',
        body: JSON.stringify({ emailOrUsername, password }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        console.log('Login bem-sucedido');
        setError('');
        navigate('/home');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Erro na conexão com o servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img src="capital-letter.svg" alt="Login Background" className="login-image" />
        <div className="login-image-text">
          <InfoBox /> {/* Adicione o InfoBox aqui */}
        </div>
      </div>
      <div className="login-form-container">
        <div className="login-header">
          <h1>Invite</h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <div className="form-group">
            <label htmlFor="emailOrUsername">Email ou Nome de Usuário</label>
            <input
              type="text"
              id="emailOrUsername"
              className="login-input"
              placeholder="Digite seu email ou nome de usuário"
              autoComplete="off"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            Entrar <i className="fas fa-sign-in-alt"></i>
          </button>
          <p>
            Não tem uma conta? <Link to="/register" className="register-link">Registrar-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
