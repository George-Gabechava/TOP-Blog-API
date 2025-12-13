import uuidv4 from "uuid/v4";
import { Router } from "express";

const router = Router();

// Create User Route
router.post("/", (req, res) => {
  const id = uuidv4();
  const user = {
    id,
    username: req.body.username,
    password: req.body.text,
    userId: req.context.me.id,
  };

  console.log(message);

  return res.send(message);
});

// export default router;
