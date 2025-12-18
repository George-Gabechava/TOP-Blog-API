import { Router } from "express";
import userController from "../controller/userController.js";

const router = Router();

// Sign Up
router.post("/signUp", userController.validateSignUp, userController.signUp);

router.get("/logOut", function (req, res, next) {
  // code
});

export default router;
