import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatPanel from "./components/ChatPanel";
import Dashboard from "./components/Dashboard";

function App() {
  const [page, setPage] = useState("chat");

  return (
    <div className="app">
      <Sidebar setPage={setPage} />

      <div className="main">
        {page === "chat" ? <ChatPanel /> : <Dashboard />}
      </div>
    </div>
  );
}

export default App;