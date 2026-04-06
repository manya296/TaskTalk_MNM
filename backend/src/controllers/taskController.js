const Task = require("../models/Task");
const { completeTaskAndMoveNext } = require("../services/workflowEngine");

exports.getTasksByOrder = async (req, res) => {
    const tasks = await Task.find({ orderId: req.params.orderId });
    res.json(tasks);
};

exports.completeTask = async (req, res) => {
    const { orderId, taskOrder } = req.body;

    await completeTaskAndMoveNext(orderId, taskOrder);

    res.json({ message: "Task completed and moved to next" });
};