import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";

import passport from "./passportAuth.js";
// Express setup
const app = express();

// CORS setup
const FRONTEND_URL1 = process.env.FRONTEND_URL1;
const FRONTEND_URL2 = process.env.FRONTEND_URL2;
const corsOptions = {
  origin: [
    "http://localhost:4173",
    "http://localhost:4174",
    FRONTEND_URL1,
    FRONTEND_URL2,
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  // 204 code needed for some legacy browsers
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport
app.use(passport.initialize());

// Set port
const PORT = process.env.PORT || 5000;

// Testing route
app.get("/", (req, res) => {
  res.status(200).send("API server is running");
});

// API routes
app.use("/api/users", userRouter);
app.use("/api/blog", blogRouter);

app.listen(PORT, function () {
  console.log(`Backend listening on port ${PORT}.`);
});
