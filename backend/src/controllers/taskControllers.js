import config from "../db/config.js"
import sql from 'mssql'


export const getTasks = async(req, res)=>{
    try {
        let pool = await sql.connect(config.sql);
        const request = await pool.request();
        const result= await request.query(`select * from tasks`);
        console.log(result);

        !result.recordset[0] ? res.status(404).json({message: 'tasks not found'}) :
        res.status(200).json(result.recordset);


        
    } catch (error) {
        console.log('error fetching tasks', error);

        res.status(201).json({ message: 'error getting tasks'})

        
    } finally{
        sql.close();
    }

}

// Get a single task
export const getTask = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const request = await pool.request();
    request.input('taskId', sql.Int, req.params.taskId);
    const result = await request.query('SELECT t.*, f.progress, f.comment FROM tasks t LEFT JOIN feedback f ON t.id = f.task_id WHERE t.id = @taskId');

    if (result.recordset.length === 0) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      const task = result.recordset[0];
      const comments = result.recordset.map(row => ({ progress: row.progress, comment: row.comment }));
      const latestProgress = result.recordset[result.recordset.length - 1].progress;
      const latestComment = result.recordset[result.recordset.length - 1].comment;
      
      const taskWithComments = {
        id: task.id,
        category: task.category,
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        endDate: task.endDate,
        assignee: task.assignee,
        progress: latestProgress,
        comment: latestComment,
        comments: comments
      };
      
      res.status(200).json(taskWithComments);
    }
  } catch (error) {
    console.log('Error fetching task:', error);
    res.status(500).json({ message: 'Error getting task' });
  } finally {
    sql.close();
  }
};


// Create a task
export const createTask = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const request = await pool.request();
    const { category, title, description, priority, startDate, endDate, assignee } = req.body;
    request.input('category', sql.VarChar(255), category);
    request.input('title', sql.VarChar(255), title);
    request.input('description', sql.Text, description);
    request.input('priority', sql.VarChar(50), priority);
    request.input('startDate', sql.Date, startDate);
    request.input('endDate', sql.Date, endDate);
    request.input('assignee', sql.VarChar(255), assignee);
    const result = await request.query('INSERT INTO tasks (category, title, description, priority, startDate, endDate, assignee) VALUES (@category, @title, @description, @priority, @startDate, @endDate, @assignee); SELECT SCOPE_IDENTITY() AS taskId');
    console.log(result);

    const taskId = result.recordset[0].taskId;
    res.status(201).json( {message: "task created successfully"});
  } catch (error) {
    console.log('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task' });
  } finally {
    sql.close();
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const request = await pool.request();
    const { category, title, description, priority, startDate, endDate, assignee } = req.body;
    request.input('taskId', sql.Int, req.params.id);
    request.input('category', sql.VarChar(255), category);
    request.input('title', sql.VarChar(255), title);
    request.input('description', sql.Text, description);
    request.input('priority', sql.VarChar(50), priority);
    request.input('startDate', sql.Date, startDate);
    request.input('endDate', sql.Date, endDate);
    request.input('assignee', sql.VarChar(255), assignee);
    await request.query('UPDATE tasks SET category = @category, title = @title, description = @description, priority = @priority, startDate = @startDate, endDate = @endDate, assignee = @assignee WHERE id = @taskId');
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.log('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task' });
  } finally {
    sql.close();
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const request = await pool.request();
    request.input('taskId', sql.Int, req.params.id);
    await request.query('DELETE FROM tasks WHERE id = @taskId');
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.log('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task' });
  } finally {
    sql.close();
  }
};

  