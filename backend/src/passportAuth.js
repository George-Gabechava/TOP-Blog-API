import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

// Prisma
import prismaPkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// JWT Passport
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET || "shhhhh";

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log("auth payload", jwt_payload);
    const username = jwt_payload.username;
    try {
      const user = await prisma.user.findUnique({ where: { username } });

      return done(null, {
        id: user.id,
        username: user.username,
        admin: user.admin,
      });
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
