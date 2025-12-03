# Kids Academy - Complete API Documentation

## Base URL
```
http://localhost:8000/api
https://your-domain.com/api (production)
```

## Authentication
All protected endpoints require Bearer token in header:
```
Authorization: Bearer {token}
```

---

## 🔐 Authentication Endpoints

### Login
```
POST /login
Content-Type: application/json

{
  "email": "admin@school.com",
  "password": "password123",
  "school_id": 1
}

Response (200):
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@school.com",
    "role": "admin",
    "school_id": 1,
    "avatar": null
  }
}
```

### Get Current User
```
GET /me
Headers: Authorization: Bearer {token}

Response (200):
{
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@school.com",
    "role": "admin",
    "school_id": 1,
    "avatar": null,
    "is_active": true
  }
}
```

### Logout
```
POST /logout
Headers: Authorization: Bearer {token}

Response (200):
{
  "message": "Logout successful"
}
```

---

## 👨‍🏫 Teacher Management Endpoints

### Create Teacher (ADMIN ONLY)
```
POST /admin/teacher/create
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "school_id": 1,
  "name": "John Doe",
  "email": "john@school.com",
  "password": "SecurePass123",
  "password_confirmation": "SecurePass123",
  "subject": "Mathematics",
  "salary": 50000,
  "join_date": "2025-01-01",
  "qualification": "B.Sc, M.Ed"
}

Response (201):
{
  "message": "Teacher account created successfully",
  "teacher": {
    "id": 1,
    "user_id": 2,
    "name": "John Doe",
    "email": "john@school.com",
    "subject": "Mathematics",
    "salary": 50000,
    "join_date": "2025-01-01"
  }
}
```

### List Teachers
```
GET /teacher/list/{school_id}
Headers: Authorization: Bearer {token}

Response (200):
{
  "message": "Teachers retrieved successfully",
  "teachers": [
    {
      "id": 1,
      "user_id": 2,
      "name": "John Doe",
      "email": "john@school.com",
      "subject": "Mathematics",
      "salary": 50000,
      "join_date": "2025-01-01",
      "qualification": "B.Sc, M.Ed",
      "is_active": true
    }
  ]
}
```

### Get Teacher Details
```
GET /teacher/show/{teacher_id}
Headers: Authorization: Bearer {token}

Response (200):
{
  "teacher": {
    "id": 1,
    "user_id": 2,
    "name": "John Doe",
    "email": "john@school.com",
    "subject": "Mathematics",
    "salary": 50000,
    "join_date": "2025-01-01",
    "qualification": "B.Sc, M.Ed",
    "bio": "Experienced mathematics teacher",
    "is_active": true
  }
}
```

### Reset Teacher Password (ADMIN ONLY)
```
POST /admin/teacher/reset-password/{teacher_id}
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "new_password": "NewPassword123",
  "new_password_confirmation": "NewPassword123"
}

Response (200):
{
  "message": "Password reset successfully for John Doe",
  "teacher": {
    "id": 1,
    "name": "John Doe",
    "email": "john@school.com"
  }
}
```

### Update Teacher
```
PUT /admin/teacher/update/{teacher_id}
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "subject": "Physics",
  "salary": 55000,
  "qualification": "B.Sc, M.Phil",
  "bio": "Excellent physics teacher"
}

Response (200):
{
  "message": "Teacher updated successfully",
  "teacher": { ... }
}
```

### Delete/Deactivate Teacher (ADMIN ONLY)
```
DELETE /admin/teacher/delete/{teacher_id}
Headers: Authorization: Bearer {token}

Response (200):
{
  "message": "Teacher account deactivated successfully"
}
```

---

## 👨‍🎓 Student Management Endpoints

### Add Student (ADMIN ONLY)
```
POST /student/add
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "school_id": 1,
  "name": "Alice Smith",
  "email": "alice@school.com",
  "roll_number": "2025001",
  "class": "10-A",
  "section": "A",
  "phone": "9876543210",
  "parent_phone": "9876543211",
  "date_of_birth": "2010-05-15",
  "gender": "female",
  "address": "123 Main St, City"
}

Response (201):
{
  "message": "Student created successfully",
  "student": { ... }
}
```

### List Students
```
GET /student/list/{school_id}
Headers: Authorization: Bearer {token}

Response (200):
{
  "message": "Students retrieved successfully",
  "students": [
    {
      "id": 1,
      "name": "Alice Smith",
      "roll_number": "2025001",
      "class": "10-A",
      "email": "alice@school.com",
      "phone": "9876543210",
      "is_active": true
    }
  ]
}
```

### Update Student
```
PUT /student/update/{student_id}
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Alice Johnson",
  "class": "10-B"
}

Response (200):
{
  "message": "Student updated successfully",
  "student": { ... }
}
```

### Delete Student (ADMIN ONLY)
```
DELETE /student/delete/{student_id}
Headers: Authorization: Bearer {token}

Response (200):
{
  "message": "Student deleted successfully"
}
```

---

## 📋 Attendance Endpoints

### Mark Student Attendance
```
POST /attendance/student/mark
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "school_id": 1,
  "student_id": 1,
  "attendance_date": "2025-01-15",
  "status": "present",
  "remarks": null
}

Response (201):
{
  "message": "Attendance marked successfully",
  "attendance": { ... }
}
```

Status values: `present`, `absent`, `leave`

### Get Today's Student Attendance
```
GET /attendance/student/today/{school_id}
Headers: Authorization: Bearer {token}

Response (200):
{
  "date": "2025-01-15",
  "attendance": [
    {
      "id": 1,
      "student_id": 1,
      "status": "present",
      "attendance_date": "2025-01-15"
    }
  ]
}
```

### Get Student Attendance History
```
GET /attendance/student/history/{student_id}
Headers: Authorization: Bearer {token}

Response (200):
{
  "student_id": 1,
  "attendance": [
    {
      "id": 1,
      "attendance_date": "2025-01-15",
      "status": "present"
    }
  ]
}
```

### Mark Teacher Attendance
```
POST /attendance/teacher/mark
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "school_id": 1,
  "teacher_id": 1,
  "attendance_date": "2025-01-15",
  "status": "present",
  "check_in": "09:00",
  "check_out": "17:00",
  "remarks": null
}

Response (201):
{
  "message": "Attendance marked successfully",
  "attendance": { ... }
}
```

---

## 💰 Fees Management Endpoints

### Add/Create Fee Entry
```
POST /fees/add
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "school_id": 1,
  "student_id": 1,
  "month": 1,
  "year": 2025,
  "amount": 5000,
  "due_date": "2025-01-31",
  "remarks": null
}

Response (201):
{
  "message": "Fee created successfully",
  "fee": { ... }
}
```

### Get Student Fees
```
GET /fees/student/{student_id}
Headers: Authorization: Bearer {token}

Response (200):
{
  "student_id": 1,
  "fees": [
    {
      "id": 1,
      "month": 1,
      "year": 2025,
      "amount": 5000,
      "paid_amount": 2500,
      "status": "partial",
      "due_date": "2025-01-31"
    }
  ]
}
```

### Get Monthly Fees Report
```
GET /fees/monthly/{school_id}/{month}/{year}
Headers: Authorization: Bearer {token}

Response (200):
{
  "month": 1,
  "year": 2025,
  "fees": [
    {
      "id": 1,
      "student_id": 1,
      "amount": 5000,
      "paid_amount": 5000,
      "status": "paid"
    }
  ]
}
```

### Record Payment
```
PUT /fees/update-payment/{fee_id}
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "paid_amount": 2500,
  "payment_method": "cash",
  "paid_date": "2025-01-15"
}

Response (200):
{
  "message": "Payment recorded successfully",
  "fee": {
    "id": 1,
    "amount": 5000,
    "paid_amount": 2500,
    "status": "partial"
  }
}
```

---

## 💵 Salary Management Endpoints

### Calculate Salary
```
POST /salary/calculate
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "school_id": 1,
  "teacher_id": 1,
  "month": 1,
  "year": 2025,
  "bonus": 5000,
  "deduction": 1000
}

Response (201):
{
  "message": "Salary calculated successfully",
  "salary": {
    "id": 1,
    "teacher_id": 1,
    "month": 1,
    "year": 2025,
    "base_salary": 50000,
    "bonus": 5000,
    "deduction": 1000,
    "net_salary": 54000,
    "status": "pending"
  }
}
```

### Get Monthly Salaries
```
GET /salary/monthly/{school_id}/{month}/{year}
Headers: Authorization: Bearer {token}

Response (200):
{
  "month": 1,
  "year": 2025,
  "salaries": [
    {
      "id": 1,
      "teacher_id": 1,
      "base_salary": 50000,
      "bonus": 5000,
      "deduction": 1000,
      "net_salary": 54000,
      "status": "pending"
    }
  ]
}
```

### Mark Salary as Paid
```
PUT /salary/mark-paid/{salary_id}
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "paid_date": "2025-01-31"
}

Response (200):
{
  "message": "Salary marked as paid",
  "salary": {
    "id": 1,
    "status": "paid",
    "paid_date": "2025-01-31"
  }
}
```

---

## 📊 Reports Endpoints

### Export Daily Attendance Report
```
GET /reports/attendance/daily/{school_id}
Headers: Authorization: Bearer {token}

Response: XLSX file download
filename: attendance_{school_id}_{date}.xlsx
```

### Export Monthly Fees Report
```
GET /reports/fees/monthly/{school_id}/{month}/{year}
Headers: Authorization: Bearer {token}

Response: XLSX file download
filename: fees_{school_id}_{year}_{month}.xlsx
```

### Export Monthly Salary Report
```
GET /reports/salary/monthly/{school_id}/{month}/{year}
Headers: Authorization: Bearer {token}

Response: XLSX file download
filename: salary_{school_id}_{year}_{month}.xlsx
```

---

## ❌ Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthenticated"
}
```

### 403 Forbidden
```json
{
  "error": "Unauthorized. Required role: admin"
}
```

### 422 Validation Error
```json
{
  "message": "Validation failed",
  "errors": {
    "email": ["Email already exists"],
    "password": ["Password must be at least 8 characters"]
  }
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error"
}
```

---

## 🔄 Common Workflows

### Complete Teacher Creation Workflow

```
1. Admin calls POST /admin/teacher/create
   - Validates all fields
   - Hashes password with bcrypt
   - Creates User record
   - Creates Teacher profile
   - Returns teacher data

2. System email notification (optional)
   - Sends credentials to teacher email

3. Teacher calls POST /login
   - Validates email + password + school_id
   - Checks if account is active
   - Generates JWT token
   - Returns token + user data

4. Teacher uses token for all requests
   - Includes in Authorization header
   - Can access their data
   - Cannot access other schools' data
```

### Complete Attendance Marking Workflow

```
1. Admin calls POST /attendance/student/mark
   - For each student in class
   - status: present/absent/leave
   - Validates student exists in school

2. System updates database
   - Creates or updates record
   - Updates last modified timestamp

3. Admin calls GET /attendance/student/today/{school_id}
   - Retrieves today's attendance
   - Shows statistics

4. Admin calls GET /reports/attendance/daily/{school_id}
   - Generates Excel file
   - Downloads to computer
   - Can email to stakeholders
```

### Complete Fee Collection Workflow

```
1. Admin calls GET /fees/monthly/{school_id}/{month}/{year}
   - Shows all students with fees

2. Admin calls PUT /fees/update-payment/{fee_id}
   - Records payment received
   - Updates status (pending → partial → paid)

3. Parent can check status
   - Amount due
   - Amount paid
   - Balance

4. Admin calls GET /reports/fees/monthly/{school_id}/{month}/{year}
   - Generates report for principal
   - Shows collection status
```

---

## 📝 Request/Response Examples

### Successful Request
```
→ Request
POST /admin/teacher/create
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "school_id": 1,
  "name": "John Doe",
  "email": "john@school.com",
  "password": "SecurePass123",
  "password_confirmation": "SecurePass123",
  "subject": "Math",
  "salary": 50000
}

← Response (201 Created)
{
  "message": "Teacher account created successfully",
  "teacher": {
    "id": 1,
    "user_id": 2,
    "name": "John Doe",
    "email": "john@school.com",
    "subject": "Math",
    "salary": 50000
  }
}
```

### Error Request
```
→ Request
POST /admin/teacher/create
Authorization: Bearer invalid-token
Content-Type: application/json

← Response (401 Unauthorized)
{
  "error": "Unauthenticated"
}
```

---

## 🔑 Rate Limiting

- Login endpoint: 5 attempts per minute
- Other endpoints: 60 requests per minute
- Exceeding limit returns 429 Too Many Requests

---

## 🔍 Query Parameters

### Pagination (Ready for implementation)
```
GET /teacher/list/{school_id}?page=1&limit=20
```

### Filtering (Ready for implementation)
```
GET /student/list/{school_id}?class=10-A&section=A
```

---

## 📖 Version Information

- **API Version**: 1.0.0
- **Last Updated**: January 2025
- **Status**: Production Ready

---

## 🚀 API Testing

### Using cURL

```bash
# Login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@school.com","password":"password123","school_id":1}'

# List Teachers
curl -X GET http://localhost:8000/api/teacher/list/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Create new collection
2. Set base URL: `http://localhost:8000/api`
3. Login to get token
4. Set Authorization header for all requests
5. Test all endpoints

---

**For more details, see PROJECT_SUMMARY.md or DEPLOYMENT.md**
