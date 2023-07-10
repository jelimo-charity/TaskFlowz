import './tasks.css'
import { FaCommentDots } from 'react-icons/fa';

function Tasks() {
  return (
    <div className="taskCard">
      <h5>Frontend</h5>
      <h6>Create the home page</h6>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi id
         praesentium mollitia nemo ratione earum ad repellendus animi iste
          nesciunt velit dicta quas sit, molestiae voluptatem libero cum
           nostrum. Omnis!</p>
  
      <h6>Choose Status:</h6>
      <select>
        <option value="notStarted">Not Started</option>
        <option value="inProgress">In Progress</option>
        <option value="done">Done</option>
        <option value="reviewed">Reviewed</option>
        <option value="overdue">Overdue</option>
      </select>
      <p className="taskLink">Check <span><FaCommentDots /></span></p>

    </div>
  );
}

export default Tasks;
