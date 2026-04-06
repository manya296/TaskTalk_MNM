const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    orderId: String,
    taskName: String,
    taskOrder: Number,
    status: {
        type: String,
        default: "pending"
    },
    startedAt: Date,
    completedAt: Date
});

module.exports = mongoose.model("Task", TaskSchema);