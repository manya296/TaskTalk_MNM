import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const sendMessage = (message) =>
  API.post("/chat/process", { message });

export const getOrders = () =>
  API.get("/orders");

export const getTasks = (orderId) =>
  API.get(`/tasks/${orderId}`);

export const completeTask = (data) =>
  API.post("/tasks/complete", data);