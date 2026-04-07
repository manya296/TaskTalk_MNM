import { useEffect, useState } from "react";
import axios from "axios";

const STATUS = {
  COMPLETED: "completed",
  PENDING: "pending"
};

const WorkflowStep = ({ orderId }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/tasks/${orderId}`
    );
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [orderId]);

  const handleComplete = async (taskOrder) => {
    await axios.post("http://localhost:5000/api/tasks/complete", {
      orderId,
      taskOrder
    });

    fetchTasks(); // refresh
  };

  return (
    <div>
      <h3>Workflow for {orderId}</h3>

      {tasks.map(task => (
        <div key={task.taskOrder} className="task">
          <span>
            {task.taskName} - {task.status}
          </span>

          {task.status !== status.COMPLETED && (
            <button onClick={() => handleComplete(task.taskOrder)}>
              Complete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkflowStep;