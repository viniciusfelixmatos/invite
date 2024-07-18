import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkUserRegistered } from '../apiclient';
import './Register.css';
import InfoBox from './InfoBox';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !username || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios');
      setSuccess('');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setSuccess('');
      return;
    }
    try {
      const isRegistered = await checkUserRegistered(email);
      if (isRegistered) {
        setError('Este email já está registrado');
        setSuccess('');
        return;
      }
      const response = await fetch('http://localhost:8080/api/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        console.log('Registrado com sucesso');
        setError('');
        setSuccess('Registrado com sucesso!');
      } else {
        setError(data.message);
        setSuccess('');
      }
    } catch (error) {
      setError('Erro na conexão com o servidor');
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      <div className="login-image-container"> {/* Usando a div login-image-container */}
        <img src="capital-letter.svg" alt="Register Background" className="register-image" />
        <div className="register-image-text">
          <InfoBox /> {/* Adicione o InfoBox aqui */}
        </div>
      </div>
      <div className="register-form-container">
        <div className="register-header">
          <h1>Registrar-se</h1>
        </div>
        <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
          {error && (
            <p className="error">
              <i className="fas fa-exclamation-circle"></i> {error}
            </p>
          )}
          {success && (
            <p className="success">
              <i className="fas fa-check-circle"></i> {success}
            </p>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="register-input"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Nome de Usuário</label>
            <input
              type="text"
              id="username"
              className="register-input"
              placeholder="Digite seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              className="register-input"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              className="register-input"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit">
            Registrar <i className="fas fa-user-plus"></i>
          </button>
          <p>
            Já tem uma conta? <Link to="/login" className="login-link">Entrar</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
