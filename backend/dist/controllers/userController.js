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
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role, contact_info } = req.body;
        const [existing] = yield database_1.default.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        if (existing.length > 0) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const [result] = yield database_1.default.query(
            'INSERT INTO users (name, email, password, role, contact_info) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, role, contact_info]
        );
        transporter.sendMail({
            from: `"Digital Complaint System" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Account Created Successfully',
            html: `
                <h2>Welcome, ${name}</h2>
                <p>Your account has been created successfully.</p>
                <p><b>Role:</b> ${role}</p>
                <p>You can now log in and start using the system.</p>
                <br/>
                <p>Regards,<br/>Digital Complaint Management Team</p>
            `
        }).catch(err => console.error('Email error:', err));
        res.status(201).json({
            message: 'User registered successfully',
            userId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const [rows] = yield database_1.default.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        if (rows.length === 0) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const user = rows[0];
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.loginUser = loginUser;
