import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../context/userContext/Context';
import { apiDomain } from '../utils/utils';
import Axios from 'axios';

function UpdateForm({ setShowEditForm, task, getTask }) {
  const { user } = useContext(Context);
  const [formData, setFormData] = useState({
    category: task.category,
    title: task.title,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    endDate: task.endDate,
    assignee: task.assignee,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        category: formData.category,
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        startDate: formData.startDate,
        endDate: formData.endDate,
        assignee: formData.assignee,
      };

      const response = await Axios.put(`${apiDomain}/tasks/${task.id}`, updatedData, {
        headers: {
          Authorization: `${user.token}`,
        },
      });

      getTask();
      alert(response.data.message);
      setShowEditForm(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        console.log('An error occurred while updating the task:', error);
      }
    }
  };

  return (
    <div>
      <div className="updateForm">
        <form className="form">
          <h2>Update Task</h2>
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
          <div className="btnUpdates">
            <button onClick={() => setShowEditForm(false)}>Close</button>
            <button type="submit" onClick={handleSave}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
