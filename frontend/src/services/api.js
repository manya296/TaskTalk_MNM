import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Chat API
export const sendMessage = (message) =>
  API.post("/chat/process", { message });

// Orders API
export const getOrders = () =>
  API.get("/orders");

// Tasks API
export const getTasks = (orderId) =>
  API.get(`/tasks/${orderId}`);

export const completeTask = (data) =>
  API.post("/tasks/complete", data);