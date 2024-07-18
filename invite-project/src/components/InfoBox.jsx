import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaHeart } from 'react-icons/fa';
import './InfoBox.css';

const InfoBox = () => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetchLikes();
  }, []);

  const fetchLikes = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/get_likes.php');
      const data = await response.json();
      setLikes(data.likes);
    } catch (error) {
      console.error('Erro ao obter curtidas:', error);
    }
  };

  const handleLikeClick = async () => {
    if (likes === 0) {
      try {
        const response = await fetch('http://localhost:8080/api/save_likes.php', {
          method: 'POST',
          body: JSON.stringify({ likes: likes + 1 }),
        });
        const data = await response.json();
        if (data.status === 'success') {
          setLikes(likes + 1); // Atualiza o estado com o novo número de curtidas
        } else {
          console.error('Erro ao salvar curtida:', data.message);
        }
      } catch (error) {
        console.error('Erro ao salvar curtida:', error);
      }
    } else {
      console.log('Você já curtiu esta postagem.');
    }
  };

  return (
    <article className="info-box">
      <p className="info-text">Conecte-se de forma simples e eficiente: Invite, a rede social do futuro.</p>
      <menu className="info-menu">
        <li>
          <a href="/profile/invite" className="info-profile-link">
            <FaUserCircle className="info-profile-icon" />
            @invite
          </a>
        </li>
        <li>
          <button type="button" className="info-like-button" onClick={handleLikeClick}>
            <FaHeart className="info-like-icon" />
            {likes} {/* Renderiza o número atual de curtidas */}
          </button>
        </li>
      </menu>
    </article>
  );
};

export default InfoBox;
