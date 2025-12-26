import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import prismaPkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Validate New User Sign Up
const validateSignUp = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters.")
    .escape(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match."),
];

// Sign Up
async function signUp(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  try {
    const { id, username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username already exists. Please choose another." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        id: id,
        username: username,
        email: email,
        password: hashedPassword,
      },
    });
    // Respond with JSON and navigate to /login.
    return res.status(201).json({ success: true, redirectTo: "/login" });
  } catch (err) {
    console.error("SignUp error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default { validateSignUp, signUp };
