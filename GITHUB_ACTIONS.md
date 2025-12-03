GitHub Actions for CI/CD

This repository includes two GitHub Actions workflows to automate deployment:

1) Frontend: `.github/workflows/deploy-frontend.yml`
- Trigger: push to files under `frontend-vite/**`.
- Behavior:
  - Installs dependencies and builds the Vite app.
  - Deploys to Netlify if `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` are provided in repository secrets.
  - Otherwise, deploys to Vercel if `VERCEL_TOKEN` is provided.
- Required secrets (one of the two options):
  - Netlify: `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`
  - Vercel: `VERCEL_TOKEN`

Notes:
- For Netlify: ensure the site exists and `NETLIFY_SITE_ID` matches it. The workflow uses the Netlify CLI to perform the deploy.
- For Vercel: the Vercel CLI will attempt to deploy; make sure your Vercel account has the project configured or the token has permissions to create a deployment.

2) Backend: `.github/workflows/deploy-backend.yml`
- Trigger: push to files under `express-backend/**`.
- Behavior:
  - Installs dependencies and runs `npx prisma generate`.
  - Triggers a Render deploy via Render REST API.
- Required secrets:
  - `RENDER_API_KEY` — create at https://dashboard.render.com -> Account -> API Keys.
  - `RENDER_SERVICE_ID` — the Render service id for your backend (you can find this in the service URL or Render dashboard).

How to set repository secrets
1. Go to your GitHub repository -> Settings -> Secrets and variables -> Actions -> New repository secret.
2. Add secrets listed above.

Example: add `RENDER_API_KEY` and `RENDER_SERVICE_ID` for backend auto-deploy.

If you prefer other deployment providers or want CI checks (lint/tests) added to these workflows, tell me which checks and I'll extend the workflows accordingly.
