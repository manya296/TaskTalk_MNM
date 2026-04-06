const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderId: String,
    customerName: String,
    item: String,
    quantity: Number,
    status: {
        type: String,
        default: "in-progress"
    },
    currentTask: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", OrderSchema);