import React from 'react'

const ChatMessages = ({ messages }) => {
  return (
    <div className="h-96 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 ${
            message.sender === 'user' ? 'text-right' : 'text-left'
          }`}
        >
          <div
            className={`inline-block p-2 rounded-lg ${
              message.sender === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatMessages