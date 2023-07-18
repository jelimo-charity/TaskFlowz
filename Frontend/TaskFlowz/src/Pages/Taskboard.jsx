import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiDomain } from '../utils/utils';
import axios from 'axios';
import { Context } from '../context/userContext/Context';
import { useContext } from 'react';

function TaskBoard() {
  const { user } = useContext(Context);
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [progress, setProgress] = useState("");
  const [comment, setComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const commentRef = useRef(null);

  const fetchTaskDetails = async () => {
    try {
      const res = await fetch(`${apiDomain}/tasks/${id}`);
      const data = await res.json();
      console.log("task")
      console.log(data)
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [id, feedbackSubmitted]);

  if (!task) {
    return <p>Loading task details...</p>;
  }

  const handleFeedback = async (e) => {
    e.preventDefault();

    const feedbackData = {
      task_id: id,
      progress,
      comment
    };

    try {
      const response = await axios.post(`${apiDomain}/feedbacks/${id}`, feedbackData, {
        headers: {
          Authorization: `${user.token}`
        }
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



  return (
    <div>
      <div className="taskD">
        <h2>Task Details</h2>
        {/* {!feedbackSubmitted && ( */}
          <>
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

            <strong>Progress:</strong> {task.progress}
            <br />
            <strong>Comment:</strong> {task.comment}
          </>
        {/* )} */}
       
      </div>
      {/* {!feedbackSubmitted && ( */}
        <>
          <hr />
          <div className="taskProgress">
            <form>
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
              <br />
              <strong>Add Comment:</strong>
              <input
                ref={commentRef}
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <br />

              <br />
              <button onClick={handleFeedback}>
                Submit Feedback
              </button>
            </form>
          </div>
        </>
      {/* )} */}
    </div>
  );
}

export default TaskBoard;
