import ChatWindow from "./components/ChatWindow";
import OrdersDashboard from "./components/OrdersDashboard";

function App() {
  const refresh = () => window.location.reload();

  return (
    <div className="container">
      <h1>ChatFlow 🚀</h1>

      <ChatWindow refreshOrders={refresh} />
      <OrdersDashboard />
    </div>
  );
}

export default App;