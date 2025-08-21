USE DEFAULT_DB;

-- Kreiranje tabele za korisnike
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    korisnickoIme VARCHAR(50) NOT NULL UNIQUE,
    lozinka VARCHAR(500) NOT NULL,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER'
); 

CREATE TABLE Content (
    ContentID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(100) NOT NULL,
    Description VARCHAR(100),
    Type NVARCHAR(20) NOT NULL, -- 'Film' ili 'Serija'
    Year INT,
    Genre NVARCHAR(50),
    ImageUrl NVARCHAR(255)
);

-- Tabela ocena
CREATE TABLE Ratings (
    RatingID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    ContentID INT,
    RatingValue INT CHECK (RatingValue BETWEEN 1 AND 5),
    CONSTRAINT fk_user FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    CONSTRAINT fk_content FOREIGN KEY (ContentID) REFERENCES Content(ContentID) ON DELETE CASCADE
);

-- Tabela trivia
CREATE TABLE Trivia (
    TriviaID INT AUTO_INCREMENT PRIMARY KEY,
    ContentID INT NOT NULL,
    TriviaText TEXT,
    CONSTRAINT fk_trivia_content FOREIGN KEY (ContentID) REFERENCES Content(ContentID) ON DELETE CASCADE
) ENGINE=InnoDB;


SELECT ContentID, AVG(RatingValue) AS ProsecnaOcena
FROM Ratings
WHERE ContentID = @id
GROUP BY ContentID;


INSERT INTO users (username, email, password, role)
VALUES ('admin', 'admin@example.com', 'hashed_password', 'admin');

INSERT INTO content (title, description, image_url, category)
VALUES ('Inception', 'Sci-fi film by Christopher Nolan', 'https://image.url/inception.jpg', 'movie');

INSERT INTO ratings (rating_value, user_id, content_id)
VALUES (5, 1, 1);

INSERT INTO trivia (content_id, fact)
VALUES (1, 'The spinning top was inspired by Nolan''s dreams.');
