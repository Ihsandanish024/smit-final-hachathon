const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// All routes are Admin protected
router.use(protect, adminOnly);

// Create a new user (Doctor / Receptionist / Patient)
router.post("/", createUser);

// Get all users (optional role filter)
router.get("/", getUsers);

// Get single user by ID
router.get("/:id", getUserById);

// Update user info
router.put("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

module.exports = router;