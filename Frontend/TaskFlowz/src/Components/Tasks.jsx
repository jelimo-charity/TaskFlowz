import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { apiDomain } from '../utils/utils';
import { Context } from '../context/userContext/Context';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './tasks.css';

function Tasks() {
  const { id } = useParams();
  const { user } = useContext(Context);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

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

  const handleSearch = () => {
    if (searchQuery === '') {
      setFilteredTasks([]);
    } else {
      const filtered = tasks.filter(
        (task) =>
          task.category.toLowerCase() === searchQuery.toLowerCase() ||
          task.priority.toLowerCase() === searchQuery.toLowerCase()
      );
      setFilteredTasks(filtered);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="taskDetails">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by category(Frontend/Backend/Design) or priority(High/Low)"
      />
      <button onClick={handleSearch}>Search</button>
      {filteredTasks.length === 0 ? (
        <>
          <p>No tasks found.</p>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <div className="taskRow">
                  <div className="taskInfo">
                    <strong>Category:</strong> <span>{task.category}</span>
                    <br />
                    <strong>Title:</strong> <span>{task.title}</span>
                    <br />
                    <strong>Description:</strong> <span>{task.description}</span>
                    <br />
                  </div>
                  <div>
                    <Link to={`/taskboard/${task.id}`} id="taskBtn">
                      Inspect Task
                    </Link>
                  </div>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <div className="taskRow">
                <div className="taskInfo">
                  <strong>Category:</strong> <span>{task.category}</span>
                  <br />
                  <strong>Title:</strong> <span>{task.title}</span>
                  <br />
                  <strong>Description:</strong> <span>{task.description}</span>
                  <br />
                </div>
                <div>
                  <Link to={`/taskboard/${task.id}`} id="taskBtn">
                    Inspect Task
                  </Link>
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
