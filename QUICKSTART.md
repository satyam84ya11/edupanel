# Kids Academy - Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites
- PHP 8.2+, Node.js 16+
- MySQL 5.7+
- Composer, Git

---

## Backend Setup (2 minutes)

```bash
cd backend

# 1. Install dependencies
composer install

# 2. Setup environment
cp .env.example .env
php artisan key:generate

# 3. Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=kidsacademy
DB_USERNAME=root
DB_PASSWORD=

# 4. Run migrations
php artisan migrate

# 5. Start server
php artisan serve
# ✅ Running at http://localhost:8000
```

---

## Frontend Setup (2 minutes)

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# 3. Start development server
npm run dev
# ✅ Running at http://localhost:3000
```

---

## Access the Application

1. **Open Browser**
   - URL: http://localhost:3000

2. **Login Credentials**
   - Email: admin@school.com
   - Password: password123
   - School ID: 1

3. **You're In!** 🎉

---

## First Steps

### As Admin

1. **Manage Teachers**
   - Go to "Teachers" page
   - Click "Add Teacher"
   - Fill form and set password
   - Click "Create Teacher"

2. **View Dashboard**
   - See statistics
   - Access quick links
   - Monitor system

3. **Mark Attendance**
   - Go to "Attendance"
   - Select date
   - Mark students present/absent
   - Save

4. **Manage Fees**
   - Go to "Fees"
   - View student fees
   - Record payments
   - Export reports

5. **Generate Reports**
   - Go to "Reports"
   - Download Excel files
   - Share with staff

---

## Important Features

### 🔒 Teacher Account Management
- ✅ Only Admin can create teachers
- ✅ Admin sets passwords
- ✅ Teachers cannot change own password
- ✅ Admin can reset password anytime

### 📊 Automated Reports
- ✅ Daily attendance export
- ✅ Monthly fees summary
- ✅ Salary calculations
- ✅ Email delivery

### 🏢 Multi-School Support
- ✅ Strict data isolation
- ✅ School-specific access
- ✅ Independent configurations

---

## Common Tasks

### Create a Teacher Account

```
1. Login as Admin
2. Go to Teachers page
3. Click "Add Teacher"
4. Fill in:
   - Name: John Doe
   - Email: john@school.com
   - Password: SecurePass123
   - Subject: Mathematics
   - Salary: 50000
5. Click "Create Teacher"
6. John can now login!
```

### Reset Teacher Password

```
1. Go to Teachers page
2. Find teacher in list
3. Click "Reset Password" button
4. Enter new password
5. Click "Reset Password"
6. Teacher gets new password next login
```

### Export Monthly Report

```
1. Go to Reports page
2. Select month and year
3. Choose report type:
   - Attendance
   - Fees
   - Salary
4. Click "Download"
5. XLSX file downloaded
```

---

## Database

### Default Admin

- **Email**: admin@school.com
- **Password**: password123
- **Role**: Administrator
- **School ID**: 1

### Create More Users

```bash
php artisan tinker

# Create admin in school
$user = App\Models\User::create([
    'school_id' => 1,
    'name' => 'New Admin',
    'email' => 'newadmin@school.com',
    'password' => Hash::make('password123'),
    'role' => 'admin',
]);
```

---

## Troubleshooting

### "Cannot connect to API"
```bash
# Check if backend is running
curl http://localhost:8000/api

# Check .env.local in frontend
cat frontend/.env.local

# Should show: NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### "Database connection failed"
```bash
# Check .env in backend
# Verify MySQL is running
mysql -u root -p kidsacademy

# Re-run migrations
php artisan migrate:fresh
```

### "Port 3000 already in use"
```bash
# Use different port
npm run dev -- -p 3001
```

### "Port 8000 already in use"
```bash
# Use different port
php artisan serve --port=8001
```

---

## File Structure

```
kidsacademy school/
├── backend/              # Laravel API
├── frontend/             # Next.js App
├── DEPLOYMENT.md        # Production guide
└── PROJECT_SUMMARY.md   # Full documentation
```

---

## Next Steps

1. ✅ **Test all features** - Create data, test workflows
2. ✅ **Customize** - Add your school logo, colors
3. ✅ **Train staff** - Admin, teachers
4. ✅ **Deploy** - Follow DEPLOYMENT.md
5. ✅ **Configure email** - For automated reports
6. ✅ **Setup backups** - Daily database backups
7. ✅ **Monitor** - Watch error logs

---

## Support

- 📖 See `PROJECT_SUMMARY.md` for full documentation
- 🚀 See `DEPLOYMENT.md` for production setup
- 📝 Check `README.md` in backend/ and frontend/ folders

---

## 🎉 Enjoy!

You now have a complete school management system running locally!

Happy managing! 📚
