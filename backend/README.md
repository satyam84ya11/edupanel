# Kids Academy School Management System - Backend (Laravel 11)

## Prerequisites
- PHP 8.2+
- MySQL 5.7+
- Composer
- Node.js (for npm)

## Installation

### 1. Setup Project
```bash
composer install
cp .env.example .env
php artisan key:generate
```

### 2. Configure Database
Edit `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kidsacademy
DB_USERNAME=root
DB_PASSWORD=
```

### 3. Run Migrations
```bash
php artisan migrate --seed
```

### 4. Start Development Server
```bash
php artisan serve
```

### 5. Generate Sanctum Tokens
```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

## API Authentication
- All protected routes require `Authorization: Bearer {token}` header
- Login returns JWT token valid for 24 hours
- Multi-school isolation via middleware

## Admin Teacher Creation Flow
1. Admin creates teacher account (sets username/password)
2. Teacher receives credentials
3. Teacher logs in with provided email/password
4. Teacher cannot modify own login credentials
5. Admin can reset password anytime

## Key Features
✅ Multi-school support with data isolation
✅ JWT Authentication via Sanctum
✅ Role-based access control (Admin/Teacher)
✅ Automated Excel reports via Maatwebsite
✅ Cron-based email delivery
✅ Production-ready deployment

## Shared Hosting Deployment
- Copy all files via FTP
- Run `composer install --no-dev` on server
- Setup `.env` with production database
- Run `php artisan migrate --force`
- Configure cron job: `* * * * * php /path/to/artisan schedule:run`
