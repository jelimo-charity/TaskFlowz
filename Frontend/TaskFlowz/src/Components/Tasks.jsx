import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { apiDomain } from '../utils/utils';
import { Context } from '../context/userContext/Context';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './tasks.css'

function Tasks() {
  const { id } = useParams();
  // const navigate = useNavigate();
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
    <div className="taskDetails">
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div className="taskRow">
                <div className="taskInfo">
                  <strong>Category:</strong> <span> {task.category}</span> 
                  <br />
                  <strong>Title:</strong> <span> {task.title}</span> 
                  <br />
                  <strong>Description:</strong><span> {task.description}</span> 
                  <br />
                  <strong>Priority:</strong> <span> {task.priority}</span> 
                  <br />
                  <strong>Start Date:</strong> <span> {task.startDate}</span> 
                  <br />
                  <strong>End Date:</strong> <span> {task.endDate}</span> 
                  <br />
                  <strong>Assignee:</strong><span> {task.assignee}</span> 
                </div>
                <div className="taskProgress">
                  <form >
                  <strong>Add Progress:</strong>
                  <select
                    value={task.progress}
                    
                  >
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="overdue">Overdue</option>
                  </select>
                  <br />
                  <strong> Add Comment:</strong>
                  <input
                    type="text"
                    value={task.comment}
                   
                  />
                  <br />
                  <Link to={`/taskboard/${task.id}`}>
                  <button type='submit' >
                    Inspect Task
                  </button>
                  </Link>
                  </form>
                </div>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks;
