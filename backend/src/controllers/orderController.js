const Order = require("../models/Order");
const { createWorkflowTasks } = require("../services/workflowEngine");

exports.createOrder = async (req, res) => {
    try {
        const { customerName, item, quantity } = req.body;

        const orderId = "ORD" + Math.floor(Math.random() * 10000);

        const order = new Order({
            orderId,
            customerName,
            item,
            quantity,
            currentTask: "Confirm Order"
        });

        await order.save();

        await createWorkflowTasks(orderId);

        res.json({ message: "Order created", orderId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
};