import React, { useState } from 'react';

function Chatbot() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMessages([...messages, { user: input, bot: data.response }]);
            setInput('');
        } catch (error) {
            console.error('Failed to fetch:', error);
        }
    };

    return (
        <div>
            <h1>Chatbot</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p><strong>User:</strong> {msg.user}</p>
                        <p><strong>Bot:</strong> {msg.bot}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chatbot;
