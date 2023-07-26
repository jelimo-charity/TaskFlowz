import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiDomain } from '../utils/utils';
import axios from 'axios';
import { Context } from '../context/userContext/Context';
import UpdateForm from '../Components/UpdateForm';
import './taskboard.css';
import Navbar from '../components/Navbar';
// import axios from 'axios'; 
function TaskBoard() {
  const { user } = useContext(Context);
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [progress, setProgress] = useState('');
  const [comment, setComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const commentRef = useRef(null);
  
  const navigate = useNavigate();
  const fetchTaskDetails = async () => {
    try {
      const res = await fetch(`${apiDomain}/tasks/${id}`);
      const data = await res.json();
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, feedbackSubmitted]);

  if (!task) {
    return <p>Loading task details...</p>;
  }

  const handleFeedback = async (e) => {
    e.preventDefault();

    const feedbackData = {
      task_id: id,
      progress,
      comment,
    };

    try {
      const response = await axios.post(`${apiDomain}/feedbacks/${id}`, feedbackData, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      console.log(response);

      setFeedbackSubmitted(!feedbackSubmitted);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('An error occurred while adding the feedback.');
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${apiDomain}/tasks/${id}`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      alert(response.data.message);
      console.log(response);
      // Handle success message or navigation to another page
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('An error occurred while deleting the task.');
      }
    }
  };

  const handleUpdate = () => {
    setShowEditForm(true);
  };

  const getTask = async () => {
    // Fetch the updated task details and update the state
    try {
      const res = await fetch(`${apiDomain}/tasks/${id}`);
      const data = await res.json();
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = async ()=>{
    navigate('/dashboard')

  }

  return (
    <div>
      <Navbar />
      <div className="taskD">
        <h2>Task Details</h2>
        <table>
          <tbody>
            <tr>
              <td><strong>Category:</strong></td>
              <td>{task.category}</td>
            </tr>
            <tr>
              <td><strong>Title:</strong></td>
              <td>{task.title}</td>
            </tr>
            <tr>
              <td><strong>Description:</strong></td>
              <td>{task.description}</td>
            </tr>
            <tr>
              <td><strong>Priority:</strong></td>
              <td>{task.priority}</td>
            </tr>
            <tr>
              <td><strong>Start Date:</strong></td>
              <td>{task.startDate}</td>
            </tr>
            <tr>
              <td><strong>End Date:</strong></td>
              <td>{task.endDate}</td>
            </tr>
            <tr>
              <td><strong>Assignee:</strong></td>
              <td>{task.assignee}</td>
            </tr>
            <tr>
              <td><strong>Progress:</strong></td>
              <td>{task.progress}</td>
            </tr>
            <tr>
              <td><strong>Comment:</strong></td>
              <td>{task.comment}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <div className="taskProgress">
        <h3>Give the Feedback of your Task!</h3>
        <div>
          <form>
            <div>
              <strong>Add Progress:</strong>
              <select
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="reviewed">Reviewed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div>
              <strong>Add Comment:</strong>
              <input
                ref={commentRef}
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div>
              <button onClick={handleFeedback}>
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="taskUpdates">
        <div>
          <h4>Delete the Task</h4>
          <button onClick={handleDelete}>Delete</button>
        </div>
        <div>
          <h4>Update the Task</h4>
          <button onClick={handleUpdate}>Update</button>
        </div> 
        <div>
          <h4>Close the Page</h4>
          <button onClick={handleClose}>Back</button>
        </div>
      </div>
      {showEditForm && <UpdateForm setShowEditForm={setShowEditForm} task={task} getTask={getTask} />}
    </div>
  );
}

export default TaskBoard;
