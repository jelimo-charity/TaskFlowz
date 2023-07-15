import  { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { apiDomain } from '../utils/utils';
import { Context } from '../context/userContext/Context';

function Tasks() {
  const { user } = useContext(Context);
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await Axios.get(`${apiDomain}/tasks`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>Category:</strong> {task.category}
              <br />
              <strong>Title:</strong> {task.title}
              <br />
              <strong>Description:</strong> {task.description}
              <br />
              <strong>Priority:</strong> {task.priority}
              <br />
              <strong>Start Date:</strong> {task.startDate}
              <br />
              <strong>End Date:</strong> {task.endDate}
              <br />
              <strong>Assignee:</strong> {task.assignee}
              <br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks;
