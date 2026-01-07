import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    .withMessage("Username must be at least 3 characters. ")
    .escape(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters. "),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match. "),
];

// Sign Up
async function signUp(req, res) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const messages = result.array().map((e) => e.msg);
    return res.status(400).json({ errors: messages });
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
        .json({ errors: ["Username already exists. Please choose another. "] });
    }

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return res
        .status(400)
        .json({ errors: ["Email already in use. Please choose another. "] });
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
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("SignUp error:", err);
    return res.status(500).json({ errors: ["Internal server error. "] });
  }
}

// Log In
async function logIn(req, res) {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res
        .status(401)
        .json({ errors: ["Invalid username or password."] });
    }

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res
        .status(401)
        .json({ errors: ["Invalid username or password."] });
    }

    const token = jwt.sign(
      { username: user.username, admin: user.admin },
      process.env.JWT_SECRET || "shhhhh",
      { expiresIn: "4d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      // Cookie maxAge currently 1 day
      maxAge: 60 * 60 * 1000 * 24 * 1,
      path: "/",
    });
    // On success, redirect and send blogger status.
    return res.status(200).json({ success: true, admin: user.admin });
  } catch (err) {
    console.error("Log In Error", err);
    return res.status(500).json({ errors: ["Internal server error. "] });
  }
}

// Log Out
function logOut(req, res) {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      path: "/",
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Log Out Error", err);
    return res.status(500).json({ errors: ["Internal server error. "] });
  }
}

export default { validateSignUp, signUp, logIn, logOut };
