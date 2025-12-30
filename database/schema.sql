-- Database Schema for Digital Complaint Management & Grievance Portal

-- Create Database
CREATE DATABASE IF NOT EXISTS complaint_portal;
USE complaint_portal;

-- 1. Users Table
-- Roles: 'User', 'Staff', 'Admin'
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, -- Added email for login which wasn't explicitly asked but is standard
    password VARCHAR(255) NOT NULL, -- Basic password storage
    role ENUM('User', 'Staff', 'Admin') NOT NULL DEFAULT 'User',
    contact_info VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Complaints Table
-- Status: 'Open', 'Assigned', 'In-progress', 'Resolved'
CREATE TABLE IF NOT EXISTS complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    staff_id INT DEFAULT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- e.g., 'Plumbing', 'Electrical'
    status ENUM('Open', 'Assigned', 'In-progress', 'Resolved') NOT NULL DEFAULT 'Open',
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    resolution_notes TEXT DEFAULT NULL,
    attachment_url VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Sample Data Seeding (Optional)
INSERT INTO users (name, email, password, role, contact_info) VALUES 
('Admin User', 'admin@example.com', 'password123', 'Admin', '1234567890'),
('John Doe', 'john@example.com', 'password123', 'User', '0987654321'),
('Tech Guy', 'tech@example.com', 'password123', 'Staff', '1122334455');
