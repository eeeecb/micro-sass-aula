import React, { useState } from 'react';
import Chatbot from './Chatbot';
import Auth from './Auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (userData) => {
    setLoading(true);
    setTimeout(() => {
      setUser(userData);
      setLoading(false);
    }, 800);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {user ? <Chatbot user={user} /> : <Auth onLogin={handleLogin} />}
    </div>
  );
}

export default App;
