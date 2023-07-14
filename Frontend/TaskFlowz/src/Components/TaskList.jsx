import { useEffect, useState } from 'react';
import axios from 'axios';

import { apiDomain } from '../utils/utils';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${apiDomain}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaskAdded = async (taskData) => {
    try {
      await axios.post(`${apiDomain}/tasks`, taskData);
      fetchTasks();
      alert('Task added successfully');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      {/* Render the list of tasks */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>Category: {task.category}</div>
            <div>Title: {task.title}</div>
            <div>Description: {task.description}</div>
            <div>Priority: {task.priority}</div>
            <div>Start Date: {task.startDate}</div>
            <div>End Date: {task.endDate}</div>
          </li>
        ))}
      </ul>
      {/* Render the TaskForm component and pass the handleTaskAdded function as a prop */}
      <TaskList onTaskAdded={handleTaskAdded} />
    </div>
  );
}

export default TaskList;
