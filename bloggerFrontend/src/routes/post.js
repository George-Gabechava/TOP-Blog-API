import { v4 as uuidv4 } from "uuid";
import { Router } from "express";

const router = Router();

// Create Post Route
router.post("/", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    name: req.body.name,
    text: req.body.text,
    userId: req.context.me.id,
  };

  console.log(message);

  // Send to backend controller?
  return res.send(message);
});

// Delete Post Route
router.delete("/:postId", (req, res) => {
  // code
});

export default router;
