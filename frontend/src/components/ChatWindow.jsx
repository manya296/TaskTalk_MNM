import { useState } from "react";
import { sendMessage } from "../services/api";

const ChatWindow = ({ refreshOrders }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input) return;

    // Add user message
    setMessages([...messages, { text: input, type: "user" }]);

    try {
      const res = await sendMessage(input);

      // Add bot response
      setMessages(prev => [
        ...prev,
        {
          text: `Order Created: ${res.data.orderId}`,
          type: "bot"
        }
      ]);

      refreshOrders();
    } catch (err) {
      console.log(err);
    }

    setInput("");
  };

  return (
    <div className="card">
      <h3>Chat</h3>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.type}:</b> {msg.text}
          </div>
        ))}
      </div>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send 5 notebooks to Rahul"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;