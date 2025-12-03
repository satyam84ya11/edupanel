# Kids Academy - Complete Deployment Guide

## Table of Contents
1. [Backend Deployment](#backend-deployment)
2. [Frontend Deployment](#frontend-deployment)
3. [Database Setup](#database-setup)
4. [Production Checklist](#production-checklist)
5. [Troubleshooting](#troubleshooting)

---

## Backend Deployment

### Option 1: Shared Hosting (cPanel)

#### Prerequisites
- PHP 8.2 or higher
- MySQL 5.7 or higher
- Composer
- SSH Access

#### Steps

1. **Connect via SSH**
```bash
ssh user@your-hosting-domain.com
```

2. **Clone or Upload Project**
```bash
cd public_html
git clone https://github.com/yourusername/kidsacademy-backend.git api
cd api
```

3. **Install Dependencies**
```bash
composer install --no-dev --optimize-autoloader
```

4. **Setup Environment**
```bash
cp .env.example .env
php artisan key:generate
```

5. **Configure .env**
```
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com/api

DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=your_db_name
DB_USERNAME=db_user
DB_PASSWORD=db_password

MAIL_MAILER=smtp
MAIL_HOST=your-mail-server
MAIL_PORT=587
MAIL_USERNAME=your-email@domain.com
MAIL_PASSWORD=app-password
```

6. **Run Migrations**
```bash
php artisan migrate --force
php artisan db:seed
```

7. **Create Cron Job**

In cPanel, go to Cron Jobs and add:
```
0 0 * * * /usr/bin/php /home/user/public_html/api/artisan schedule:run >> /dev/null 2>&1
```

8. **Setup File Permissions**
```bash
chmod -R 755 /home/user/public_html/api
chmod -R 777 /home/user/public_html/api/storage
chmod -R 777 /home/user/public_html/api/bootstrap/cache
```

9. **Configure htaccess**

Update `/public_html/api/public/.htaccess`:
```apache
<IfModule mod_rewrite.c>
    <IfModule mod_friendlyurls.c>
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^ index.php [QSA,L]
    </IfModule>
</IfModule>
```

10. **Point Public Root**

In cPanel, set Document Root to `public_html/api/public`

### Option 2: AWS/Digital Ocean/VPS

#### Prerequisites
- Linux server (Ubuntu 20.04 LTS)
- SSH access
- Domain configured

#### Steps

1. **Connect to Server**
```bash
ssh ubuntu@your-server-ip
```

2. **Install Dependencies**
```bash
sudo apt update
sudo apt install -y php8.2 php8.2-{fpm,mysql,redis,curl,json,xml,mbstring,zip} nginx mysql-server composer git
```

3. **Clone Repository**
```bash
cd /var/www
sudo git clone https://github.com/yourusername/kidsacademy-backend.git
cd kidsacademy-backend
sudo composer install --no-dev
```

4. **Setup .env**
```bash
sudo cp .env.example .env
sudo php artisan key:generate
sudo chown -R www-data:www-data /var/www/kidsacademy-backend
```

5. **Configure Nginx**

Create `/etc/nginx/sites-available/kidsacademy-api`:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/kidsacademy-backend/public;
    index index.php;
    
    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    client_max_body_size 100M;
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/kidsacademy-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

6. **Setup SSL (Let's Encrypt)**
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

7. **Configure Cron**
```bash
sudo crontab -e
# Add: 0 * * * * cd /var/www/kidsacademy-backend && php artisan schedule:run >> /dev/null 2>&1
```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Visit [vercel.com](https://vercel.com)
- Click "New Project"
- Select your GitHub repo
- Click "Import"

3. **Set Environment Variables**
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

4. **Deploy**
- Vercel automatically deploys on push

### Option 2: Netlify

1. **Build Production**
```bash
npm run build
npm run export
```

2. **Deploy**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=out
```

3. **Set Environment Variables**

In Netlify dashboard:
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### Option 3: Shared Hosting

1. **Build Production**
```bash
npm run build
```

2. **Upload Files**

Upload these directories via FTP:
- `.next/`
- `node_modules/`
- `public/`
- `package.json`
- `package-lock.json`

3. **Configure Node.js Server**

Create `server.js`:
```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('Ready on http://localhost:3000');
  });
});
```

4. **Use PM2 for Process Management**
```bash
npm install -g pm2
pm2 start server.js --name kidsacademy
pm2 startup
pm2 save
```

---

## Database Setup

### Initial Setup (First Time)

```bash
# SSH into backend server
ssh user@your-domain.com

# Run migrations
php artisan migrate

# Seed default data
php artisan db:seed
```

### Default Admin Account

After seeding:
- **Email**: admin@school.com
- **Password**: password123
- **School ID**: 1

### Backup Database

```bash
# Local backup
mysqldump -u root -p kidsacademy > backup_$(date +%Y%m%d).sql

# Restore backup
mysql -u root -p kidsacademy < backup_20250102.sql
```

---

## Production Checklist

- [ ] Set `APP_ENV=production` in backend .env
- [ ] Set `APP_DEBUG=false` in backend .env
- [ ] Generate strong app keys: `php artisan key:generate`
- [ ] Configure CORS in backend (.env CORS_ALLOWED_ORIGINS)
- [ ] Enable HTTPS on both frontend and backend
- [ ] Setup SSL certificates (Let's Encrypt)
- [ ] Configure email (SMTP) in .env
- [ ] Setup database backups (daily)
- [ ] Configure monitoring/alerts
- [ ] Setup log rotation
- [ ] Test cron job execution
- [ ] Verify file permissions
- [ ] Test all API endpoints
- [ ] Test payment/fees workflow
- [ ] Test report generation
- [ ] Load testing
- [ ] Security audit

---

## Security Recommendations

1. **HTTPS Only**
   - Redirect HTTP to HTTPS
   - Use HSTS headers

2. **API Security**
   - Rate limiting on login endpoint
   - JWT token expiry (24 hours)
   - CORS configuration
   - Input validation on all endpoints

3. **Database Security**
   - Strong passwords
   - Regular backups
   - Encrypted backups

4. **Server Security**
   - Firewall enabled
   - SSH key-based authentication
   - Fail2ban for brute-force protection
   - Regular security updates

5. **Code Security**
   - No hardcoded secrets
   - Use .env for all secrets
   - Regular dependency updates

---

## Monitoring & Maintenance

### Daily Checks
- [ ] Server uptime
- [ ] Database connectivity
- [ ] API response times
- [ ] Error logs review

### Weekly Checks
- [ ] Database backups completed
- [ ] Storage space available
- [ ] Failed email reports

### Monthly Checks
- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance review
- [ ] Cost optimization

---

## Troubleshooting

### API Connection Issues

**Problem**: "Cannot connect to API"

**Solution**:
```bash
# Check backend health
curl https://your-api-domain.com/api/health

# Verify CORS headers
curl -H "Origin: https://your-frontend.com" https://your-api-domain.com/api/login -v
```

### Database Connection Errors

**Problem**: "SQLSTATE[HY000]: General error"

**Solution**:
```bash
# Check database connection
php artisan db

# Run migrations
php artisan migrate --force

# Check database logs
tail -f /var/log/mysql/error.log
```

### Cron Job Not Running

**Problem**: Reports not being sent

**Solution**:
```bash
# Check cron log
grep CRON /var/log/syslog | tail -20

# Test manually
php artisan schedule:work

# Verify command works
php artisan reports:send-attendance-daily
```

### Memory Issues

**Problem**: Out of memory errors

**Solution**:
```bash
# Increase PHP memory limit in .env
php_memory_limit=512M

# Optimize database queries
php artisan optimize:clear
php artisan config:cache

# Use Laravel horizon for queues
composer require laravel/horizon
php artisan horizon:install
```

---

## Support & Help

For issues or questions:
1. Check logs: `/storage/logs/`
2. Review Laravel docs: https://laravel.com/docs
3. Check Next.js docs: https://nextjs.org/docs
4. Contact support team

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Status**: Production Ready ✅
