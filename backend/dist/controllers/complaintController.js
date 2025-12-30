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
exports.assignComplaint = exports.updateStatus = exports.updateComplaintRaw = exports.createComplaint = exports.getComplaints = void 0;
const database_1 = __importDefault(require("../config/database"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const getUser = (req) => req.user;
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const getComplaints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = getUser(req);
        let query = 'SELECT c.*, u.name as filed_by, s.name as assigned_to FROM complaints c JOIN users u ON c.user_id = u.id LEFT JOIN users s ON c.staff_id = s.id';
        let params = [];
        if (user.role === 'User') {
            query += ' WHERE c.user_id = ?';
            params.push(user.id);
        } else if (user.role === 'Staff') {
            query += ' WHERE c.staff_id = ?';
            params.push(user.id);
        }
        query += ' ORDER BY c.created_at DESC';
        const [rows] = yield database_1.default.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching complaints' });
    }
});
exports.getComplaints = getComplaints;
const createComplaint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = getUser(req);
        const { title, description, category, attachment_url } = req.body;
        if (!title || !description || !category) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        const [result] = yield database_1.default.query(
            'INSERT INTO complaints (user_id, title, description, category, attachment_url, status) VALUES (?, ?, ?, ?, ?, ?)',
            [user.id, title, description, category, attachment_url || null, 'Open']
        );
        const [userRows] = yield database_1.default.query(
            'SELECT email FROM users WHERE id = ?',
            [user.id]
        );
        const userEmail = userRows.length > 0 ? userRows[0].email : null;
        if (userEmail) {
            transporter.sendMail({
                from: `"Digital Complaint System" <${process.env.EMAIL_USER}>`,
                to: userEmail,
                subject: 'Complaint Registered Successfully',
                html: `
                    <h2>Complaint Registered</h2>
                    <p>Your complaint has been successfully registered.</p>
                    <p><b>Complaint Title:</b> ${title}</p>
                    <p><b>Category:</b> ${category}</p>
                    <p><b>Status:</b> Open</p>
                    <br/>
                    <p>We will review your complaint and update you soon.</p>
                    <p>Regards,<br/>Digital Complaint Management Team</p>
                `
            }).catch(err => console.error('Complaint email error:', err));
        }
        res.status(201).json({
            message: 'Complaint filed successfully',
            id: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating complaint' });
    }
});
exports.createComplaint = createComplaint;
const updateComplaintRaw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = getUser(req);
    } catch (error) { }
});
exports.updateComplaintRaw = updateComplaintRaw;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = getUser(req);
        const { id } = req.params;
        const { status } = req.body;
        if (user.role === 'User') {
            res.status(403).json({ message: 'Not authorized to update status' });
            return;
        }
        const [existing] = yield database_1.default.query(
            'SELECT * FROM complaints WHERE id = ?',
            [id]
        );
        if (existing.length === 0) {
            res.status(404).json({ message: 'Complaint not found' });
            return;
        }
        yield database_1.default.query(
            'UPDATE complaints SET status = ? WHERE id = ?',
            [status, id]
        );
        res.json({ message: 'Complaint status updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating complaint' });
    }
});
exports.updateStatus = updateStatus;
const assignComplaint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = getUser(req);
        const { id } = req.params;
        const { staff_id } = req.body;
        if (user.role !== 'Admin') {
            res.status(403).json({ message: 'Only Admin can assign staff' });
            return;
        }
        yield database_1.default.query(
            'UPDATE complaints SET staff_id = ?, status = ? WHERE id = ?',
            [staff_id, 'Assigned', id]
        );
        res.json({ message: 'Staff assigned successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error assigning staff' });
    }
});
exports.assignComplaint = assignComplaint;