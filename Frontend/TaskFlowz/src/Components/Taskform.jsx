import { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { Context } from '../context/userContext/Context';
import { apiDomain } from '../utils/utils';
import './taskform.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createNotification } from '../Components/notify'

function TaskForm() {
  const { user } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    priority: '',
    startDate: '',
    endDate: '',
    assignee: '',
  });

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(`${apiDomain}/tasks`, formData, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      // Show success toast notification for task creation
      toast.success(response.data.message);

      // Create notification data with the task details
      const notificationData = {
        userId: user.UserID, // Replace 'id' with the actual field name for user ID in your context
        content: `You have a new task created: ${formData.title}`, // Customize the notification content as per your requirements
      };

      // Call the createNotification function to create a notification
      await createNotification(user, notificationData);

      // Clear the form data after successful submission
      setFormData({
        category: '',
        title: '',
        description: '',
        priority: '',
        startDate: '',
        endDate: '',
        assignee: '',
      });
    } catch (error) {
      // Handle error and show error toast notification
      console.log(error);
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('An error occurred while adding the task.');
      }
    }
  };

  const getUsers = async () => {
    try {
      const res = await Axios.get(`${apiDomain}/users`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='taskform'>
      <form>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="design">Design</option>
          </select>
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="assignee">Assignee:</label>
          <select
            id="assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
          >
            <option>Select Assignee</option>
            {/* Map over the users to create dropdown options */}
            {users.map((user) => (
              <option >{user.Email} </option>
            ))}
          </select>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Add Task
        </button>
      </form>
      {/* Add the ToastContainer to display the toast messages */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default TaskForm;
