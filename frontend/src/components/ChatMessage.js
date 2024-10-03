import React from 'react';

function ChatMessage({ message, sender }) {
  return (
    <div className={`message ${sender}`}>
      {message}
    </div>
  );
}

export default ChatMessage;