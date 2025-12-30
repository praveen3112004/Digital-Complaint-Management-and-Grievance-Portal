"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
<<<<<<< HEAD
    password: process.env.DB_PASSWORD || '',
=======
    password: process.env.DB_PASSWORD || 'YOURDBPASSWORD',
>>>>>>> 94cf4cb5bd00fdaeb95285bb0fdf68e57d64f5ee
    database: process.env.DB_NAME || 'complaint_portal',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.default = pool;
