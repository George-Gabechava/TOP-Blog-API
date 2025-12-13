import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// Load environment variables
dotenv.config();

// Set port
const PORT = process.env.PORT || 5000;

// Testing route
app.get("/", (req, res) => {
  res.status(200).send("API server is running");
});

app.listen(PORT, function () {
  console.log(`Backend listening on port ${PORT}.`);
});
