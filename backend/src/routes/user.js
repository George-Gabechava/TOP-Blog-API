import { Router } from "express";
import bcrypt from "bcryptjs";
import prismaPkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const router = Router();

// Sign Up
router.post("/signUp", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body || {};

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }
    if (username.length < 3) {
      return res
        .status(400)
        .json({ error: "Username must be at least 3 characters." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: { id: true, username: true, email: true },
    });

    // Redirect to /login after successful signUp.
    const frontendBase = process.env.FRONTEND_URL || "http://localhost:4173";
    return res.redirect(303, `${frontendBase}/login`);
  } catch (err) {
    console.error("SignUp error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
