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