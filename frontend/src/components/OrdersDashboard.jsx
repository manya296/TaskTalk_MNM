import { useEffect, useState } from "react";
import { getOrders } from "../services/api";
import TaskList from "./TaskList";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    const res = await getOrders();
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="card">
      <h3>Orders</h3>

      {orders.map(order => (
        <div key={order.orderId} className="order">
          <p><b>{order.orderId}</b></p>
          <p>{order.item} ({order.quantity})</p>
          <p>Current Task: {order.currentTask}</p>

          <button onClick={() => setSelectedOrder(order.orderId)}>
            View Tasks
          </button>
        </div>
      ))}

      {selectedOrder && <TaskList orderId={selectedOrder} />}
    </div>
  );
};

export default OrdersDashboard;