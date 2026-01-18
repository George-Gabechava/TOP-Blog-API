//Prisma
import prismaPkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Imports
import sanitizeHtml from "sanitize-html";

// If blogger, get all blogs
async function getPosts(req, res) {
  try {
    if (req.user.admin === true) {
      const posts = await prisma.post.findMany();
      return res.status(200).json({ allPosts: posts });
    } else {
      return res
        .status(403)
        .json({ errors: ["Forbidden: blogger access required."] });
    }
  } catch (err) {
    console.error("Update post error:", err);
    return res.status(400).json({ errors: ["Failed to get blogs."] });
  }
}

// If viewer, get all published blogs
async function getPublishedPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({ where: { published: true } });
    return res.status(200).json({ allPosts: posts });
  } catch (err) {
    console.error("Update post error:", err);
    return res.status(400).json({ errors: ["Failed to get blogs."] });
  }
}

// if blogger, get specific blog
async function getPost(req, res) {
  try {
    if (req.user.admin === true) {
      let id = parseInt(req.params.postId);

      const post = await prisma.post.findUnique({ where: { id } });
      return res.status(200).json({ post: post });
    }
    // if not blogger (commenter/ not logged in), don't load blog details
    else {
      return res
        .status(403)
        .json({ errors: ["Forbidden: blogger access required."] });
    }
  } catch (err) {
    console.error("Update post error:", err);
    return res.status(400).json({ errors: ["Failed to get blogs."] });
  }
}

// if viewer, get specific published blog
async function getPublishedPost(req, res) {
  try {
    let id = parseInt(req.params.postId);

    const post = await prisma.post.findUnique({
      where: { id, published: true },
    });
    return res.status(200).json({ post: post });
  } catch (err) {
    console.error("Update post error:", err);
    return res.status(400).json({ errors: ["Failed to get blog."] });
  }
}
// Get Comments
async function getComments(req, res) {
  try {
    let postId = req.params.postId;
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
      include: { owner: { select: { username: true } } },
      orderBy: { uploadedAt: "desc" },
    });
    return res.status(200).json({ allComments: comments });
  } catch (err) {
    console.error("Update post error:", err);
    return res.status(400).json({ errors: ["Failed to get comments."] });
  }
}

// Update blog
async function updatePost(req, res) {
  try {
    if (!req.user.admin) {
      return res
        .status(403)
        .json({ errors: ["Forbidden: blogger access required."] });
    }

    const { name, message, tags, publish, createdAt } = req.body || {};

    const data = {};
    data.name = name;
    data.published = publish;
    data.createdAt = new Date(createdAt);
    // format tags to work in db
    const split = tags.split(",");
    const trim = split.map((word) => word.trim());
    data.tags = trim;

    // Sanitize message for safety
    const sanitizedMessage = sanitizeHtml(message);
    data.message = sanitizedMessage;

    const updated = await prisma.post.update({
      where: { id: parseInt(req.params.postId) },
      data,
    });

    return res.status(200).json({ success: true, post: updated });
  } catch (err) {
    console.error("Update post error:", err);
    return res.status(400).json({ errors: ["Failed to update post."] });
  }
}

// If blogger, create an unpublished blog (default)
async function createPost(req, res) {
  try {
    if (req.user.admin === true) {
      const data = {
        name: "New Blog",
        message: "New message.",
        ownerId: req.user.id,
        tags: [],
      };

      await prisma.post.create({ data });

      return res.status(201).json({ success: true });
    }

    // if not authorized, throw error
    else {
      return res
        .status(403)
        .json({ errors: ["Forbidden: blogger access required."] });
    }
  } catch (err) {
    console.error("Update post error:", err);
    return res.status(400).json({ errors: ["Failed to create post."] });
  }
}
// If blogger, delete blog
async function deletePost(req, res) {
  try {
    if (req.user.admin === true) {
      let postId = req.params.postId;
      await prisma.post.delete({ where: { id: parseInt(postId) } });
      return res.status(200).json({ success: true });
    }
    // if not authorized, throw error
    else {
      return res
        .status(403)
        .json({ errors: ["Forbidden: blogger access required."] });
    }
  } catch (err) {
    console.error("Delete post error:", err);
    return res.status(400).json({ errors: ["Failed to delete post."] });
  }
}

async function deleteComment(req, res) {
  try {
    if (!req.user.admin) {
      return res
        .status(403)
        .json({ errors: ["Forbidden: blogger access required."] });
    }
    let commentId = req.params.commentId;

    await prisma.comment.delete({ where: { id: parseInt(commentId) } });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Delete comment error:", err);
    return res.status(400).json({ errors: ["Failed to delete comment."] });
  }
}

export default {
  getPosts,
  getPublishedPosts,
  getPost,
  getPublishedPost,
  getComments,
  updatePost,
  createPost,
  deletePost,
  deleteComment,
};
