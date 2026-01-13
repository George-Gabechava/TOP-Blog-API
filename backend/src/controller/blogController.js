//Prisma
import prismaPkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// if blogger, show all blogs
async function getPosts(req, res) {
  if (req.user.admin === true) {
    const posts = await prisma.post.findMany();
    return res.status(200).json({ allPosts: posts });
  }
  // if not blogger (commenter/ not logged in), don't load blogs
  else {
    return res
      .status(403)
      .json({ errors: ["Forbidden: blogger access required."] });
  }
}
async function deletePost(req, res) {
  return res.status(501).json({ errors: ["Delete post error."] });
}

// if blogger, get specific blog
async function getPost(req, res) {
  if (req.user.admin === true) {
    let id = req.params.postId;

    const post = await prisma.post.findUnique({ where: { id } });
    return res.status(200).json({ post: post });
  }
  // if not blogger (commenter/ not logged in), don't load blog details
  else {
    return res
      .status(403)
      .json({ errors: ["Forbidden: blogger access required."] });
  }
}

// update blog
async function updatePost(req, res) {
  try {
    if (!req.user?.admin) {
      return res
        .status(403)
        .json({ errors: ["Forbidden: blogger access required."] });
    }

    const { name, message, tags, publish } = req.body || {};

    const data = {};
    data.name = name;
    data.message = message;
    data.published = publish;
    // format tags to work in db
    const split = tags.split(",");
    const trim = split.map((word) => word.trim());
    data.tags = trim;

    const updated = await prisma.post.update({
      where: { id: req.params.postId },
      data,
    });

    return res.status(200).json({ success: true, post: updated });
  } catch (err) {
    console.error("Update post error:", err);
    return res.status(400).json({ errors: ["Failed to update post."] });
  }
}

export default { getPosts, deletePost, getPost, updatePost };
