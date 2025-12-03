Backend deployment to Render (free tier) — Express + Prisma

Overview
- We assume the backend is in `express-backend/` and uses Prisma with a Postgres database.
- Render can host the web service and a managed Postgres database. The example `render.yaml` is provided for reference, but you can deploy via Render dashboard for a simpler workflow.

Steps (Render dashboard)
1. Push backend to GitHub
- Commit and push `express-backend` to a GitHub repo.

2. Create Postgres DB on Render
- In Render dashboard, create a new PostgreSQL database (Managed PostgreSQL).
- Copy the `DATABASE_URL` (connection string).

3. Create a new Web Service on Render
- Click New → Web Service and connect your GitHub repo.
- Branch: `main` (or whichever branch)
- Environment: `Node` (select Node)
- Build Command: `npm install && npm run migrate:deploy` (This installs dependencies, generates Prisma Client via `postinstall`, and runs production migrations.)
- Start Command: `npm run start` (Your `package.json` already has a `start` script: `node src/index.js`)

4. Set environment variables
- In the service settings add:
  - `DATABASE_URL` → value from managed Postgres (or your DB)
  - `JWT_SECRET` → secure random string
  - `UPLOADS_DIR` → `/tmp/uploads` or configure S3 variables if using S3
  - Any other envs from `.env.example`

5. (Optional) Run migrations & seed
- The recommended build command `npm install && npm run migrate:deploy` already handles migrations.
- To seed data, you can connect to your service using Render's shell after the first successful deploy and run `npm run seed`.

6. Update frontend proxy
- After Render deploys, copy the public service URL (e.g. `https://kidsacademy-backend.onrender.com`) and update `frontend-vite/vercel.json` and `frontend-vite/_redirects`/`netlify.toml` to replace `YOUR-RENDER-BACKEND-URL`.

Notes & limitations
- Render free plan may sleep the service after inactivity and has resource limits.
- Make sure to secure JWT secret and database credentials in Render dashboard — do NOT commit secrets into repo.
- If using file uploads, consider S3 for persistence; the `/tmp` directory on Render is ephemeral.

Commands (PowerShell) for local testing
```powershell
# Navigate to the backend folder
cd 'c:\Users\satya\OneDrive\Desktop\kidsacademy school\express-backend'

# Install dependencies and generate Prisma client
npm install

# Set up and migrate the database (ensure .env file exists)
npx prisma migrate dev --name init
node prisma/seed.js

# Start the server
node src/index.js
```
