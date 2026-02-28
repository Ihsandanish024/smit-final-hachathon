const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getDashboardStats,
} = require("../controllers/adminController");

const router = express.Router();

// Protect all routes and allow only admin
router.use(protect, adminOnly);

// GET /api/admin/stats
router.get("/stats", getDashboardStats);

module.exports = router;