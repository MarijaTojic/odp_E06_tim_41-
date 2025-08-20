-- Kreiranje baze podataka
CREATE DATABASE IF NOT EXISTS DEFAULT_DB;

-- Koriscenje default baze podataka
USE DEFAULT_DB;

-- Kreiranje tabele za korisnike
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    korisnickoIme VARCHAR(50) UNIQUE NOT NULL,
    uloga VARCHAR(15) NOT NULL,
    lozinka VARCHAR(500) NOT NULL
);

-- Tabela sadržaja (filmovi i serije)
CREATE TABLE Content (
    ContentID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    Type NVARCHAR(20) NOT NULL, -- 'Film' ili 'Serija'
    Year INT,
    Zanr NVARCHAR(50),
    Slika NVARCHAR(255)
);

-- Tabela ocena
CREATE TABLE Ratings (
    RatingID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT FOREIGN KEY REFERENCES Users(UserID) ON DELETE CASCADE,
    ContentID INT FOREIGN KEY REFERENCES Content(ContentID) ON DELETE CASCADE,
    RatingValue INT CHECK (RatingValue BETWEEN 1 AND 5)
);

-- Tabela trivia
CREATE TABLE Trivia (
    TriviaID INT PRIMARY KEY IDENTITY(1,1),
    ContentID INT FOREIGN KEY REFERENCES Content(ContentID) ON DELETE CASCADE,
    TriviaText NVARCHAR(MAX)
);