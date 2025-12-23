"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const complaintController_1 = require("../controllers/complaintController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware); // Apply to all complaint routes
router.get('/', complaintController_1.getComplaints);
router.post('/', complaintController_1.createComplaint);
router.put('/:id/status', complaintController_1.updateStatus);
router.put('/:id/assign', complaintController_1.assignComplaint);
exports.default = router;
