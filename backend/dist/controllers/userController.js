"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const database_1 = __importDefault(require("../config/database"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role, contact_info } = req.body;
        // Check if user exists
        const [existing] = yield database_1.default.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // Insert user (Password should be hashed in production, keeping simple as requested/demo)
        const [result] = yield database_1.default.query('INSERT INTO users (name, email, password, role, contact_info) VALUES (?, ?, ?, ?, ?)', [name, email, password, role, contact_info]);
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const [rows] = yield database_1.default.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.loginUser = loginUser;
