import React, { useState } from 'react';

const ChatBox = () => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleStartConversation = () => {
    setConversation((prevConversation) => [
      ...prevConversation,
      { type: 'bot', message: `Hello, ${name} from ${country}! How can I help you today?` },
    ]);
  };

  const handleSendMessage = () => {
    setLoading(true);
    setTimeout(() => {
      setConversation((prevConversation) => [
        ...prevConversation,
        { type: 'user', message: userInput },
        {
          type: 'bot',
          message: `Thank you for your question, ${name}! You can find more information here: https://www.google`,
        },
      ]);
      setUserInput('');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 pt-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Chatbox</h1>
      {conversation.length === 0 ? (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={handleNameChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-400"
          />
          <input
            type="text"
            placeholder="Your Country"
            value={country}
            onChange={handleCountryChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-400"
          />
          <button
            onClick={handleStartConversation}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Start Conversation
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {conversation.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'bot' ? 'justify-start' : 'justify-end'}`}>
              <div
                className={`p-2 border border-gray-300 rounded-lg ${
                  message.type === 'bot' ? 'bg-gray-100' : 'bg-blue-100'
                }`}
              >
                {message.message}
              </div>
            </div>
          ))}
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={handleUserInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-400"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;