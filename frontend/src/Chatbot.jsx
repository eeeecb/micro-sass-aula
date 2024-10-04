import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatMessages from './components/ChatMessage';

const Chatbot = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessages([
      {
        text: `Olá ${user.nome}! Como posso ajudar você hoje?`,
        sender: 'bot'
      }
    ]);
  }, [user.nome]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage = { text: input, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: input
      });

      const botMessage = { 
        text: response.data.response || 'Desculpe, não consegui gerar uma resposta.',
        sender: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = {
        text: error.response?.data?.error || 'Erro ao processar sua mensagem.',
        sender: 'bot',
        isError: true
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <ChatMessages messages={messages} />
      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded-l focus:outline-none focus:border-blue-500"
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
