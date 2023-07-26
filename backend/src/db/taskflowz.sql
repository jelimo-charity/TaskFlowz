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
 
 select * from tasks where id = 1
 select * from tasks

-- Create Comment and Progress table 

CREATE TABLE feedback (
  id  INT IDENTITY(1,1) PRIMARY KEY,
  task_id INT,
  progress VARCHAR(255),
  comment VARCHAR(255),
  FOREIGN KEY (task_id) REFERENCES tasks(id)
);

SELECT t.*, f.comment
FROM tasks t
LEFT JOIN feedback f ON t.id = f.task_id
WHERE t.id = 1
-- Assuming the "tasks" table already exists and has a task with id = 1
INSERT INTO feedback (task_id, progress, comment)
VALUES (1, 'In Progress', 'This task is going well.');

INSERT INTO feedback (task_id, progress, comment)
VALUES (2, 'In Progress', 'This task is going well.');

select * from feedback

CREATE TABLE Notifications (
  id INT IDENTITY(1,1) PRIMARY KEY,
  UserId INT,
  Content VARCHAR (255),
  FOREIGN KEY (UserId) REFERENCES Users(UserID)
);

-- Inserting the first row
INSERT INTO Notifications (UserId, Content) VALUES (1, 'New task assigned');

select * from Notifications
-- Inserting the second row 

