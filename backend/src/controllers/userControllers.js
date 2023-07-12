import config from "../db/config.js";
import sql from 'mssql'



export const getUsers = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query(`select * from dbo.Users`);
        console.log(result); // Log the result, not 'error'
        !result.recordset[0] ? res.status(404).json({ message: 'users not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
        console.log('Error retrieving users:', error); // Log the error here
        res.status(201).json({ error: 'an error occurred while retrieving users' });
    } finally {
        sql.close(); // Close the SQL connection
    }
};



////



// // // // Get a single user
export const getUser= async (req, res) => {
    try {
        const { UserID } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input("userID", sql.Int,UserID)


            .query("select * from Users where UserID = @UserID");
        !result.recordset[0] ? res.status(404).json({ message: 'User not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving user' });
    } finally {
        sql.close();
    }
};


 // // Create a new user
export const createUser = async (req, res) => {
    try {
        const { UserID, Username, Email, Password} = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("UserID", sql.Int, UserID)
            .input("Username", sql.VarChar, Username)
            .input("Email", sql.VarChar, Email)
            .input("Password", sql.VarChar, Password)

            .query("INSERT INTO Users (UserID, Username, Email, Password) VALUES (@UserID, @Username, @Email, @Password)");
        res.status(201).json({ message: 'user created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
     finally {
        sql.close();
    }
};




// // // Update a USER
// Update a USER
export const updateUser = async (req, res) => {
    try {
        const { UserID } = req.params;
        const { Username, Email, Password } = req.body;

        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("UserID", sql.Int, UserID)
            .input("Username", sql.VarChar, Username)
            .input("Email", sql.VarChar, Email)
            .input("Password", sql.VarChar, Password)

            .query("UPDATE Users SET UserID = @UserID, Username = @Username, Email = @Email, Password = @Password WHERE UserID = @UserID");

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the user' });
    }
};

// // // Delete a USER
export const deleteUser = async (req, res) => {
    try {
        const { UserID } = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM Users WHERE UserID = ${UserID}`;
        res.status(200).json({ message: 'USER deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    } finally {
        sql.close();
    }
};