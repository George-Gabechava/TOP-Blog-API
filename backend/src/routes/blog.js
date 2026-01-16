import { Router } from "express";
import blogController from "../controller/blogController.js";
import passport from "../passportAuth.js";

const router = Router();

// Get Blogs
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  blogController.getPosts,
);

// Get Published Blogs
router.get(
  "/published",
  passport.authenticate("jwt", { session: false }),
  blogController.getPublishedPosts,
);

// Get A Blog
router.get(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  blogController.getPost,
);

// Get Published Blog
router.get(
  "/published/:postId",
  passport.authenticate("jwt", { session: false }),
  blogController.getPublishedPost,
);

// Get A Blog Comments
router.get("/comments/:postId", blogController.getComments);

// Update Blog
router.put(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  blogController.updatePost,
);

// Create New Post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  blogController.createPost,
);

// Delete Post
router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  blogController.deletePost,
);

// Delete Comment
router.delete(
  "/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  blogController.deleteComment,
);

export default router;
