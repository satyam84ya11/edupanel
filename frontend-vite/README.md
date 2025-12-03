# KidsAcademy Frontend (Vite + React + Tailwind)

This is a UI-only frontend scaffold for the School Management System.

Features implemented:
- Vite + React
- TailwindCSS
- React Router
- Auth context storing token + user in localStorage
- ProtectedRoute wrapper with role-based redirects
- Login page (public; no header/footer)
- Role-specific dashboard pages (UI only)
- Placeholder CRUD pages for students/faculty/staff
- Small component library (Sidebar, Topbar, Card, Table, SearchBar, AlertBox, FileUploader, Modal, Pagination)

Run locally (PowerShell):

```powershell
cd 'c:\Users\satya\OneDrive\Desktop\kidsacademy school\frontend-vite'
npm install
npm run dev
```

Notes:
- The app expects backend API endpoints under `/api/*` as defined in the spec (e.g. `POST /api/auth/login`, `GET /api/search`, `GET /api/alerts`, CRUD endpoints). You can configure a proxy in Vite if your backend runs on another port.
- Login flow expects `POST /api/auth/login` to return `{ token, user: { id, name, role, userid } }`.
- The public site shows only the Login page (`/`). After login, user is redirected to dashboard based on role.

Next suggested steps:
- Wire the CRUD pages to real endpoints and forms.
- Add file upload + S3 integration for documents.
- Improve accessibility and add i18n if needed.
