"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const complaintController_1 = require("../controllers/complaintController");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/'); },
    filename: (req, file, cb) => { cb(null, Date.now() + path_1.default.extname(file.originalname)); }
});
const upload = (0, multer_1.default)({ storage: storage });
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware); // Apply to all complaint routes
router.get('/', complaintController_1.getComplaints);
router.post('/', upload.single('image'), complaintController_1.createComplaint);
router.put('/:id/status', complaintController_1.updateStatus);
router.put('/:id/assign', complaintController_1.assignComplaint);
exports.default = router;
