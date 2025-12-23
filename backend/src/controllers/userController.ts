import { Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, contact_info } = req.body;
    
    // Check if user exists
    const [existing] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
       res.status(400).json({ message: 'User already exists' });
       return;
    }

    // Insert user (Password should be hashed in production, keeping simple as requested/demo)
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO users (name, email, password, role, contact_info) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, role, contact_info]
    );

    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    
    if (rows.length === 0) {
       res.status(401).json({ message: 'Invalid credentials' });
       return;
    }

    const user = rows[0];
    // In a real app, generate JWT here. Returning user info for simple auth.
    res.json({ 
        message: 'Login successful', 
        user: { id: user.id, name: user.name, role: user.role, email: user.email } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getStaff = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, name, email FROM users WHERE role = ?', ['Staff']);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching staff' });
  }
};
