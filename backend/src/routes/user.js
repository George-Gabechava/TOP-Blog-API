import { Router } from "express";
import userController from "../controller/userController.js";

const router = Router();

// Sign Up
router.post("/signUp", userController.validateSignUp, userController.signUp);

// Log In
router.post("/logIn", userController.logIn);

// Log Out
router.post("/logOut", userController.logOut);

export default router;
