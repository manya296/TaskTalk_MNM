import { useEffect, useState } from "react";
import axios from "axios";
import WorkflowStep from "./WorkflowStep";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="dashboard">
      <h2>Orders Dashboard</h2>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Current Task</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.item}</td>
              <td>{order.quantity}</td>
              <td>{order.currentTask}</td>
              <td>
                <button onClick={() => setSelectedOrder(order.orderId)}>
                  View Tasks
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TASK PANEL */}
      {selectedOrder && (
        <div className="task-panel">
          <WorkflowStep orderId={selectedOrder} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;