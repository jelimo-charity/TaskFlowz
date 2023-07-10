
function TaskForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or data processing here
    console.log('Form submitted');
  };

  return (
    <div>
      <h2>Add a Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category">
            <option value="">Select Category</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="design">Design</option>
          </select>
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description"></textarea>
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select id="priority">
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
