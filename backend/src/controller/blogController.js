//Prisma
import prismaPkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// if blogger, show all blogs
async function getPosts(req, res) {
  console.log(req.user);
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

export default { getPosts, deletePost };
