# Kids Academy Frontend (Next.js + React + TailwindCSS)

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Update API URL in .env.local if backend is not on localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── login/          # Login page
│   ├── dashboard/      # Main dashboard
│   ├── teachers/       # Teachers management
│   ├── students/       # Students management
│   ├── attendance/     # Attendance marking
│   ├── fees/           # Fees management
│   ├── salary/         # Salary management
│   ├── reports/        # Reports generation
│   ├── settings/       # User settings
│   └── layout.tsx      # Root layout
├── components/
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── Navbar.tsx      # Top navigation bar
│   ├── ProtectedRoute.tsx  # Auth protection
│   ├── ToastProvider.tsx   # Toast notifications
│   └── modals/         # Modal components
│       ├── AddTeacherModal.tsx
│       └── ResetPasswordModal.tsx
├── context/
│   └── AuthContext.tsx # Authentication context
├── lib/
│   └── api.ts         # Axios API instance
└── public/            # Static assets
```

## Key Features

✅ **Teacher Management** (Admin only)
- Create teacher accounts with admin-set passwords
- Reset teacher passwords anytime
- View all teachers

✅ **Student Management** (Admin only)
- Add/edit/delete students
- Track student information

✅ **Attendance** (Admin)
- Mark daily attendance for students
- View attendance history

✅ **Fees Management** (Admin)
- Track student fees
- Export monthly fees reports

✅ **Salary Management** (Admin)
- Calculate and manage teacher salaries
- Export monthly salary reports

✅ **Reports**
- Export attendance, fees, and salary reports to Excel
- Download reports in XLSX format

✅ **Responsive Design**
- Mobile-friendly Shopify-style UI
- Dark mode support-ready
- TailwindCSS styling

## Authentication

- **Login**: Email + Password + School ID required
- **Token Storage**: JWT token stored in localStorage
- **Auto-Redirect**: Unauthenticated users redirected to /login
- **Session Expiry**: 24-hour token validity

## API Integration

All API calls use axios with automatic token injection:
- Request: Bearer token automatically added to headers
- Response: 401 errors redirect to login
- Error Handling: Toast notifications for user feedback

## Default Login Credentials

```
Email: admin@school.com
Password: password123
School ID: 1
```

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub and connect with Vercel
npm install -g vercel
vercel

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### Shared Hosting / VPS

```bash
# Build for production
npm run build

# Upload `out/` or `.next/` folder via FTP
# Set environment variables on server
```

### Environment Variables

```
NEXT_PUBLIC_API_URL=http://your-backend-domain.com/api
```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Notifications**: React-Toastify
- **Icons**: React-Icons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Page load time: < 2s
- Optimized images
- Code splitting
- Static generation where possible

## Support & Troubleshooting

### Issue: Cannot connect to API

**Solution**: Check NEXT_PUBLIC_API_URL in .env.local and ensure backend is running

### Issue: "Unauthenticated" on page load

**Solution**: Clear localStorage and login again

### Issue: CORS errors

**Solution**: Add frontend URL to CORS_ALLOWED_ORIGINS in backend .env

## Future Enhancements

- Dark mode toggle
- Export to PDF
- Bulk operations
- Advanced filtering
- Dashboard widgets
- Real-time notifications
- Mobile app (React Native)

## License

Proprietary - Kids Academy School Management System
