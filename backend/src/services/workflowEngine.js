const Task = require("../models/Task");
const Order = require("../models/Order");


const workflowSteps = [
    { name: "Confirm Order", order: 1 },
    { name: "Prepare Item", order: 2 },
    { name: "Package", order: 3 },
    { name: "Dispatch", order: 4 }
];

const createWorkflowTasks = async (orderId) => {
    const tasks = workflowSteps.map(step => ({
        orderId: orderId,
        taskName: step.name,
        taskOrder: step.order,
        status: "pending"
    }));

    await Task.insertMany(tasks);
};

const completeTaskAndMoveNext = async (orderId, taskOrder) => {
    await Task.findOneAndUpdate(
        { orderId, taskOrder },
        { status: "completed", completedAt: new Date() }
    );

    const nextTask = await Task.findOne({
        orderId,
        taskOrder: taskOrder + 1
    });

    if (nextTask) {
        await Order.findOneAndUpdate(
            { orderId },
            { currentTask: nextTask.taskName }
        );
    } else {
        await Order.findOneAndUpdate(
            { orderId },
            { status: "completed", currentTask: "Completed" }
        );
    }
};

module.exports = {
    createWorkflowTasks,
    completeTaskAndMoveNext
};