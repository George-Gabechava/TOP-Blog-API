# TOP-Blog-Api

A full‑stack blog platform.

The blog uses one backend and two different front-ends for viewing and editing blogs. One frontend (bloggerFrontend) is for authorized bloggers to create posts using the TinyMCE editor and allows the bloggers to delete comments. The other frontend (visitorFrontend) is for visitors to view published blog posts and allows registered users to create comments.

The tech stack used includes PostgreSQL with Prisma, Express, React/Vite, & Node.js. Passport‑JWT is used for JWT token‑based authentication. The backend also features server‑side validation, HTML sanitization, and CORS.

For installation:
A TinyMCE API key (free) is required for blogging in the bloggerFrontend project variables. TinyMCE premium features can be enabled by uncommenting the plugins in the Editor located in /bloggerFrontend/src/pages/BlogDetail.jsx . Add your site to your TinyMCE approved domain list: https://www.tiny.cloud/my-account/domains/ .

Site Link: https://top-blog-api-visitorfrontend-production.up.railway.app/

<p align="center">
  <img 
    src="./screenshot.png" 
    alt="App Screenshot" 
  >
</p>
