import { useState } from "react";
import MessageBubble from "./MessageBubble";
import AnalysisPanel from "./AnalysisPanel";
import axios from "axios";

const ChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const sendMessage = async () => {
    if (!input) return;

    setMessages([...messages, { text: input, type: "user" }]);

    const res = await axios.post(
      "http://localhost:5000/api/chat/process",
      { message: input }
    );

    setMessages(prev => [
      ...prev,
      {
        text: `Order received: ${res.data.orderId}`,
        type: "bot"
      }
    ]);

    setAnalysis(res.data.extractedData);
    setInput("");
  };

  return (
    <div className="chat-container">
      
      {/* LEFT CHAT */}
      <div className="chat-box">
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m.text} type={m.type} />
        ))}

        <div className="input-box">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send 20 boxes of pens..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      {/* RIGHT ANALYSIS PANEL */}
      <AnalysisPanel data={analysis} />

    </div>
  );
};

export default ChatPanel;