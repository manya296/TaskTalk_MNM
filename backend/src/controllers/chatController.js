const { extractOrderData } = require("../services/rulebasedNLP");
const Order = require("../models/Order");
const { createWorkflowTasks } = require("../services/workflowEngine");

exports.processChat = async (req, res) => {
    try {
        const { message } = req.body;

        // Step 1: Extract structured data (RULE-BASED)
        const data = extractOrderData(message);

        // Step 2: Create Order
        const orderId = "ORD" + Math.floor(Math.random() * 10000);

        const order = new Order({
            orderId,
            customerName: data.customerName,
            item: data.item,
            quantity: data.quantity,
            currentTask: "Confirm Order"
        });

        await order.save();

        // Step 3: Create workflow tasks
        await createWorkflowTasks(orderId);

        res.json({
            message: "Order created successfully (rule-based NLP)",
            orderId,
            extractedData: data
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};