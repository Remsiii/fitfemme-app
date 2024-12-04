-- SQL script to add a 'language' column to the 'users' table
ALTER TABLE users
ADD COLUMN language VARCHAR(10) DEFAULT 'en';

-- Optionally, update existing users to have a default language
UPDATE users SET language = 'en' WHERE language IS NULL;
