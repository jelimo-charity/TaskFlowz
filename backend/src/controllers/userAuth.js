import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const loginRequired = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Use async/await instead of bcrypt.hashSync

  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request()
      .input('Username', sql.VarChar, username)
      .input('Email', sql.VarChar, email)
      .query(`SELECT * FROM Users WHERE Username = @Username OR Email = @Email`);

    const user = result.recordset[0];
    if (user) {
      res.status(409).json({ message: "User already exists" });
    } else {
      await pool.request()
        .input('Username', sql.VarChar, username)
        .input('Email', sql.VarChar, email)
        .input('hashedPassword', sql.VarChar, hashedPassword)
        .query('INSERT INTO Users (Username, Email, Password) VALUES (@Username, @Email, @hashedPassword)');

      res.status(200).send({ message: 'User created successfully' });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  } finally {
    sql.close();
  }
};


   


export const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    console.log(Email, Password);

    let pool = await sql.connect(config.sql);
    const result = await pool.request()
      .input('Email', sql.VarChar, Email)
      .query('SELECT * FROM Users WHERE Email = @Email');

    const user = result.recordset[0];
    console.log(user);

    if (!user) {
      return res.status(401).json({ error: 'no user, Invalid credentials' });
    } else if (user) {
      const passwordMatch = await bcrypt.compare(Password, user.Password);
      console.log(passwordMatch);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed, wrong password' });
      }
    }

    const token = jwt.sign(
      { UserID: user.UserID, Username: user.Username, Email: user.Email },
      config.jwt_secret,
      { expiresIn: '1hr' }
    );

    const { UserID, Username } = user;
    res.json({ UserID: UserID, Username: Username, Email: Email, token: token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};



