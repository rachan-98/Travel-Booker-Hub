const express = require("express");
const { body } = require("express-validator");
const { register, login, getMe } = require("../controllers/auth.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

router.post("/register", registerValidation, register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);

module.exports = router;
