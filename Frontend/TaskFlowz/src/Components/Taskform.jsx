import React, { useContext, useState } from 'react';
import { Context } from '../context/userContext/Context';
import axios from 'axios';
import './taskform.css';
import { apiDomain } from '../utils/utils';

function TaskForm() {
  const { user } = useContext(Context);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    priority: '',
    startDate: '',
    endDate: '',
    assignee: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    await axios
      .post(`${apiDomain}/tasks`, formData, {
        headers: {
          Authorization: `${user.token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
        
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert('An error occurred while adding the task.');
        }
      });
  };
  

  return (
    <div>
      <form>
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="design">Design</option>
          </select>
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="assignee">Assignee Email:</label>
          <input type="email" id="assignee" name="assignee" value={formData.assignee} onChange={handleChange} />
        </div>
        {/* <div>
          <label htmlFor="assignee">Assignee Email:</label><br/>
          <input type="email" id="assignee" name="assignee" value={formData.assignee} onChange={handleChange} />
        </div> */}
        <button type="submit" onClick={handleSubmit}>Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
