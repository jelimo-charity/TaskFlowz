Create database Taskflowz
use Taskflowz

-- Users Table 

CREATE TABLE Users (
  UserID INT IDENTITY(1,1) PRIMARY KEY,
  Username VARCHAR(50) NOT NULL,
  Email VARCHAR(100) NOT NULL,
  Password VARCHAR(100) NOT NULL
);
--insert data
INSERT INTO Users ( Username, Email, Password)
VALUES ( 'jelimo', 'jelimo@gmail.com', 'jelimo123');

SELECT * FROM Users




-- tasks table 

CREATE TABLE tasks (
  id INT IDENTITY(1,1) PRIMARY KEY,
  category VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(50),
  startDate DATE,
  endDate DATE,
  assignee VARCHAR(255)
);

INSERT INTO tasks (category, title, description, priority, startDate, endDate, assignee)
VALUES ('frontend', 'Sample Task', 'This is a sample task', 'high', '2023-07-15', '2023-07-20', 'john@example.com');
 
 select * from tasks
