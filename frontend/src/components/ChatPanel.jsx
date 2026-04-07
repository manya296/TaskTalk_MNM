import { useState } from "react";
import MessageBubble from "./MessageBubble";
import AnalysisPanel from "./AnalysisPanel";
import axios from "axios";

const ChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Handle sending message
  const handleSend = async () => {
    const cleanInput = input.trim();

    // ✅ Prevent empty input
    if (!cleanInput) return;

    // Add user message
    const userMessage = { text: cleanInput, type: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat/process`,
        { message: cleanInput }
      );

      const botMessage = {
        text: `✅ Order Created: ${res.data.orderId}`,
        type: "bot"
      };

      // Add bot response
      setMessages((prev) => [...prev, botMessage]);

      // Update analysis panel
      setAnalysis(res.data.extractedData);

    } catch (error) {
      console.error("Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          text: "❌ Failed to process request",
          type: "bot"
        }
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="chat-container">

      {/* 🔹 Chat Section */}
      <div className="chat-box">

        {/* Messages */}
        <div className="messages">
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg.text}
              type={msg.type}
            />
          ))}

          {loading && (
            <p className="loading">Processing...</p>
          )}
        </div>

        {/* Input */}
        <div className="input-box">
          <input
            type="text"
            value={input}
            placeholder="e.g. Send 5 pens to Rahul tomorrow"
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={handleSend}>
            Send
          </button>
        </div>
      </div>

      {/* 🔹 Analysis Panel */}
      <AnalysisPanel data={analysis} />

    </div>
  );
};

export default ChatPanel;