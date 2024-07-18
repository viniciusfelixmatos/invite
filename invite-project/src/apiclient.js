// src/api.js

export const checkUserRegistered = async (email) => {
  try {
    const response = await fetch(`http://localhost:8080/api/check_user.php?email=${email}`);
    const data = await response.json();
    return data.status === 'success';
  } catch (error) {
    console.error('Erro ao verificar registro do usuário:', error);
    return false;
  }
};

// api.js
// apiclient.js
export const getUserData = async () => {
  const response = await fetch('http://localhost:8080/api/get_user_data.php', {
    method: 'GET',
    credentials: 'include', // Inclua cookies se necessário
  });
  if (!response.ok) {
    throw new Error('Erro ao buscar dados do usuário');
  }
  return await response.json();
};

// API MENSAGENS

export const fetchMessages = async () => {
  const response = await fetch('http://localhost:8080/api/fetch_messages.php');
  if (!response.ok) {
    throw new Error('Erro ao carregar mensagens');
  }
  return await response.json();
};

export const postMessage = async (text) => {
  const userData = await getUserData();
  const response = await fetch('http://localhost:8080/api/post_message.php', {
    method: 'POST',
    body: JSON.stringify({ username: userData.username, text }),
  });
  if (!response.ok) {
    throw new Error('Erro ao enviar mensagem');
  }
  return await response.json();
};