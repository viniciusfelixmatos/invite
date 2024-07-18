import React, { useEffect, useState } from 'react';
import { getUserData, fetchMessages, postMessage } from '../apiclient';
import { FaUser, FaPaperPlane, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData();
        setUsername(userData.username);

        const messagesData = await fetchMessages();
        setMessages(messagesData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const message = await postMessage(newMessage);
        setMessages([...messages, message]);
        setNewMessage('');
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="home-container">
      <div className="top-section">
        <div className="user-info" onClick={toggleMenu}>
          <FaUser className="user-icon" />
          <span className="username">{username}</span>
        </div>
        <div className="invite-text">Invite</div>
      </div>
      <main className="maindiv">
        <section className="content-section">
          <h2>BEM VINDO A PÁGINA INICIAL</h2>

        </section>
        <section className="chat-section">
          <h2>Chat Principal</h2>
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.username === username ? 'my-message' : 'other-message'}`}
              >
                <div className="message-content">
                  <strong>{msg.username}</strong> {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="message-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escreva uma mensagem..."
            />
            <button onClick={handleSendMessage} className="buttonplane">
              <FaPaperPlane />
            </button>
          </div>
        </section>
        {menuVisible && (
          <div className="user-menu">
          <ul>
            <li>
              <FaUser style={{ marginRight: '10px' }} />
              Perfil
            </li>
            <li>
              <FaCog style={{ marginRight: '10px' }} />
              Configurações
            </li>
            <li>
              <FaSignOutAlt style={{ marginRight: '10px' }} />
              Sair
            </li>
          </ul>
        </div>
        )}
      </main>
    </div>
  );
};

export default Home;
