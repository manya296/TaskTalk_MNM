const express = require("express");
const router = express.Router();
const { getTasksByOrder, completeTask } = require("../controllers/taskController");

router.get("/:orderId", getTasksByOrder);
router.post("/complete", completeTask);

module.exports = router;