import { Router } from "express";
import userController from "../controller/userController.js";
import passport from "../passportAuth.js";

const router = Router();

// Sign Up
router.post("/signUp", userController.validateSignUp, userController.signUp);

// Log In
router.post("/logIn", userController.logIn);

// Authorization check
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  userController.me
);

export default router;
