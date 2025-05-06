import { useState, useEffect, useRef } from 'react';
import apiEND from '../API/axios';
import Pusher from 'pusher-js';

const useChat = (currentUserId) => {
  const [messages, setMessages] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const response = await apiEND.get('/chat'); // Utilisation de la route '/conversations1'
      setConversations(response.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des conversations:', error);
    }
  };

  const fetchMessages = async (userId) => {
    setActiveConversation(userId);
    try {
      const response = await apiEND.get(`/messages/${userId}`);
      setMessages(response.data.data.data); // Ajustez en fonction de la structure de votre réponse paginée
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
    }
  };

  const sendMessage = async (receiverId, content, media = null) => {
    try {
      const formData = new FormData();
      formData.append('receiver_id', receiverId);
      formData.append('content', content);
      if (media) {
        formData.append('media', media);
      }

      const response = await apiEND.post('/messages/send', formData, { // Utilisation de la route '/messages/send'
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessages((prevMessages) => [...prevMessages, response.data.data]);
      // Mise à jour optimiste de la conversation (peut être gérée par l'événement Pusher)
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.other_user.id === receiverId
            ? { ...conv, last_message: response.data.data }
            : conv
        )
      );
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  };

  useEffect(() => {
    fetchConversations();

    // Configuration de Pusher
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe(`private-chat.${currentUserId}`);
    channel.bind('message.sent', (data) => {
      if (data.message.sender_id !== currentUserId) {
        setMessages((prevMessages) => [...prevMessages, data.message]);
        // Mise à jour de la conversation si elle est active
        setConversations((prevConversations) =>
          prevConversations.map((conv) =>
            conv.other_user.id === data.message.sender_id
              ? { ...conv, last_message: data.message, unread_count: (conv.unread_count || 0) + 1 }
              : conv
          )
        );
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [currentUserId]);

  return {
    messages,
    conversations,
    activeConversation,
    fetchMessages,
    sendMessage,
    setMessages, // Utile pour réinitialiser les messages lors du changement de conversation
    setConversations, // Utile pour les mises à jour externes
    messagesEndRef,
  };
};

export default useChat;