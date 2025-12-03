Frontend deployment (Vercel / Netlify)

This project (`frontend-vite`) is a Vite-built static site. You can deploy on either Vercel or Netlify.

1) Prepare repository
- Commit and push `frontend-vite` to a GitHub repository (recommended).

2) Vercel (recommended for seamless Git integration)
- Go to https://vercel.com and sign in with GitHub.
- Click "New Project" → import your GitHub repo containing `frontend-vite`.
- Set framework to "Other" (Vite) or it may auto-detect. Set build command: `npm run build` and output directory: `dist`.
- Add Environment Variables (if needed):
  - `VITE_API_BASE` (not used by default; we proxy `/api` to render backend via `vercel.json`)
- Deploy.
- After deploying, update `vercel.json`'s `YOUR-RENDER-BACKEND-URL` with the actual Render backend URL (or create a project alias in Vercel environment variables / rewrites).

3) Netlify
- Go to https://app.netlify.com and sign in with GitHub.
- Click New site from Git → choose your GitHub repo.
- Build command: `npm run build`; Publish directory: `dist`.
- Add `NETLIFY` environment variables if necessary.
- Add `_redirects` or `netlify.toml` (already included) to proxy `/api/*` to your backend. Replace `YOUR-RENDER-BACKEND-URL` in `_redirects` and `netlify.toml` with your backend URL.

Proxying /api
- Vercel: `vercel.json` contains a route that rewrites `/api/*` to your Render backend. Replace the placeholder backend URL.
- Netlify: `_redirects` and `netlify.toml` included; update the backend URL placeholder.

Notes
- Ensure your backend has CORS configured to accept requests from your frontend origin if you don't proxy.
- If you want client-side API base URL usage, set `VITE_API_BASE` and use it in `src/api/api.js` (currently uses `/api`).

Commands (PowerShell):
```powershell
# from the frontend folder
cd 'c:\Users\satya\OneDrive\Desktop\kidsacademy school\frontend-vite'
npm run build
# locally preview
npm run preview
```
