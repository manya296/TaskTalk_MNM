import { useEffect, useState } from "react";
import { getTasks, completeTask } from "../services/api";

const TaskList = ({ orderId }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await getTasks(orderId);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [orderId]);

  const handleComplete = async (taskOrder) => {
    await completeTask({ orderId, taskOrder });
    fetchTasks();
  };

  return (
    <div className="card">
      <h4>Tasks for {orderId}</h4>

      {tasks.map(task => (
        <div key={task.taskOrder}>
          {task.taskName} - {task.status}

          {task.status !== "completed" && (
            <button onClick={() => handleComplete(task.taskOrder)}>
              Complete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;