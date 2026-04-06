const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: ".env" });

const connectDB = require("./config/db");

const orderRoutes = require("./routes/orders");
const taskRoutes = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/orders", orderRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("ChatFlow Backend Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});