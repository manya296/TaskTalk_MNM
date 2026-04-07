const { extractOrderData } = require("../services/rulebasedNLP");
const Order = require("../models/orderModel");
const Task = require("../models/taskModel");

// 🔹 Helper: Create workflow tasks
const createWorkflowTasks = async (orderId) => {
  const steps = [
    "Confirm Order",
    "Check Inventory",
    "Generate Invoice",
    "Dispatch Order",
    "Delivery Confirmation"
  ];

  const tasks = steps.map((step, index) => ({
    orderId,
    taskName: step,
    taskOrder: index + 1,
    status: index === 0 ? "pending" : "pending"
  }));

  await Task.insertMany(tasks);
};

// 🔹 Main Controller
exports.processChat = async (req, res) => {
  try {
    const { message } = req.body;

    // ✅ Input validation
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid input" });
    }

    // ✅ Clean input
    const cleanMessage = message.trim().toLowerCase();

    // ✅ Extract structured data using NLP
    const data = extractOrderData(cleanMessage);

    // ✅ Generate unique order ID
    const orderId = `ORD-${Date.now()}`;

    // ✅ Create order in DB
    const newOrder = new Order({
      orderId,
      customerName: data.customerName,
      item: data.item,
      quantity: data.quantity,
      currentTask: "Confirm Order"
    });

    await newOrder.save();

    // ✅ Generate workflow tasks
    await createWorkflowTasks(orderId);

    // ✅ Success response
    return res.status(201).json({
      message: "Order created successfully",
      orderId,
      extractedData: data
    });

  } catch (error) {
    console.error("Chat processing error:", error);

    // ✅ Safe error response
    return res.status(500).json({
      error: "Internal Server Error"
    });
  }
};