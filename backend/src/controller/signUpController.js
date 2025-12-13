import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

// Validate New User Sign Up
const validateSignUp = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters.")
    .escape(),
  body("password")
    .isLength({ min: 10 })
    .withMessage("Password must be at least 10 characters."),
  body("confirm")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match."),
];

// Sign Up
async function signUp(req, res) {
  const errors = validationResult;

  if (!errors.isEmpty()) {
    return errors.array();
  }

  try { }
}
