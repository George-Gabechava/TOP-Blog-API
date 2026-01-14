import { v4 as uuidv4 } from "uuid";
import { Router } from "express";
import blogController from "../controller/blogController.js";
import passport from "../passportAuth.js";

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

// Get Blogs
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  blogController.getPosts
);

// Get A Blog
router.get(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  blogController.getPost
);

// Get A Blog Comments
router.get("/comments/:postId", blogController.getComments);

// Update Blog
router.put(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  blogController.updatePost
);

// Delete Post
router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  blogController.deletePost
);

// Delete Comment
router.delete(
  "/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  blogController.deleteComment
);

export default router;
