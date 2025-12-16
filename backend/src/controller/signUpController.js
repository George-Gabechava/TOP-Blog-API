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
    .isLength({ min: 6 })
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

  try {
    const {id, username, email, password} = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: req.user },
    });

    if (existingUser) {
      let errors = {errors: [{ msg: "Username already exists. Please choose another." }] }
      return JSON.stringify(errors);
    }
    const createUser = await prisma.user.create({
      data: {
        id: id,
        username: username,
        email: email, 
        password: password
      }
    }) 
    return JSON.stringify("success");
  }
}
