import config from "../db/config.js";
import sql from 'mssql'


export const getNotification = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query(`select * from dbo.Notifications`);
        console.log(result); // Log the result, not 'error'
        !result.recordset[0] ? res.status(404).json({ message: 'notifications not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
        console.log('Error retrieving users:', error); // Log the error here
        res.status(201).json({ error: 'an error occurred while retrieving users' });
    } finally {
        sql.close(); // Close the SQL connection
    }
};


export const createNotification = async (req, res) => {
    try {
      const { userId, content } = req.body; // Assuming userId and content are sent in the request body
  
      if (!userId || !content) {
        return res.status(400).json({ error: 'userId and content are required fields' });
      }
  
      let pool = await sql.connect(config.sql);
      const result = await pool.request().query(
        `INSERT INTO dbo.Notifications (UserId, Content) VALUES (${userId}, '${content}')`
      );
  
      return res.status(201).json({ message: 'Notification created successfully' });
    } catch (error) {
      console.log('Error creating notification:', error);
      res.status(500).json({ error: 'An error occurred while creating the notification' });
    } finally {
      sql.close();
    }
  };
  

  export const deleteNotification = async (req, res) => {
    try {
      const { notificationId } = req.params; // Assuming the notificationId is passed as a URL parameter
  
      if (!notificationId) {
        return res.status(400).json({ error: 'notificationId is a required parameter' });
      }
  
      let pool = await sql.connect(config.sql);
      const result = await pool.request().query(
        `DELETE FROM dbo.Notifications WHERE id = ${notificationId}`
      );
  
  
      return res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
      console.log('Error deleting notification:', error);
      res.status(500).json({ error: 'An error occurred while deleting the notification' });
    } finally {
      sql.close();
    }
  };
  