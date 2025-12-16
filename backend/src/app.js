import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";

// Middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set port
const PORT = process.env.PORT || 5000;

// Testing route
app.get("/", (req, res) => {
  res.status(200).send("API server is running");
});

// API routes
app.use("/api/users", userRouter);

app.listen(PORT, function () {
  console.log(`Backend listening on port ${PORT}.`);
});
