import config from "../db/config.js";
import sql from 'mssql';

export const getFeedbacks = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const request = await pool.request();
    const result = await request.query(`SELECT * FROM feedback`);
    console.log(result);

    !result.recordset[0]
      ? res.status(404).json({ message: 'Feedback not found' })
      : res.status(200).json(result.recordset);
  } catch (error) {
    console.log('Error fetching feedback', error);
    res.status(500).json({ message: 'Error getting feedback' });
  } finally {
    sql.close();
  }
};

export const updateFeedback = async (req, res) => {
  const { id, progress, comment } = req.body;
  try {
    let pool = await sql.connect(config.sql);
    const request = await pool.request();
    const result = await request.query(
      `UPDATE feedback SET progress = '${progress}', comment = '${comment}' WHERE id = ${id}`
    );
    console.log(result);

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ message: 'Feedback not found' });
    } else {
      res.status(200).json({ message: 'Feedback updated successfully' });
    }
  } catch (error) {
    console.log('Error updating feedback', error);
    res.status(500).json({ message: 'Error updating feedback' });
  } finally {
    sql.close();
  }
};

export const deleteFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    let pool = await sql.connect(config.sql);
    const request = await pool.request();
    const result = await request.query(`DELETE FROM feedback WHERE id = ${id}`);
    console.log(result);

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ message: 'Feedback not found' });
    } else {
      res.status(200).json({ message: 'Feedback deleted successfully' });
    }
  } catch (error) {
    console.log('Error deleting feedback', error);
    res.status(500).json({ message: 'Error deleting feedback' });
  } finally {
    sql.close();
  }
};

export const getFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    let pool = await sql.connect(config.sql);
    const request = await pool.request();
    const result = await request.query(`SELECT * FROM feedback WHERE id = ${id}`);
    console.log(result);

    if (!result.recordset[0]) {
      res.status(404).json({ message: 'Feedback not found' });
    } else {
      res.status(200).json(result.recordset[0]);
    }
  } catch (error) {
    console.log('Error fetching feedback', error);
    res.status(500).json({ message: 'Error getting feedback' });
  } finally {
    sql.close();
  }
};

export const createFeedback = async (req, res) => {
    const {id} = req.params
  const {  progress, comment } = req.body;
  try {
    let pool = await sql.connect(config.sql);
    const request = await pool.request()
    .input("id", sql.Int, id)
    .input("progress", sql.VarChar, progress)
    .input("comment", sql.VarChar, comment)


    const result = await request.query(
      `INSERT INTO feedback (task_id, progress, comment) VALUES (@id, '@progress', '@comment')`
    );
    console.log(result);

    res.status(201).json({ message: 'Feedback created successfully' });
  } catch (error) {
    console.log('Error creating feedback', error);
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};
