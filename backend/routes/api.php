<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\FeeController;
use App\Http\Controllers\Api\SalaryController;
use App\Http\Controllers\Api\ReportController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // ADMIN TEACHER MANAGEMENT ROUTES (ONLY ADMIN CAN ACCESS)
    Route::middleware('role:admin')->group(function () {
        Route::post('/admin/teacher/create', [TeacherController::class, 'create']);
        Route::post('/admin/teacher/reset-password/{teacher_id}', [TeacherController::class, 'resetPassword']);
        Route::delete('/admin/teacher/delete/{teacher_id}', [TeacherController::class, 'delete']);
        Route::put('/admin/teacher/update/{teacher_id}', [TeacherController::class, 'update']);
    });

    // TEACHER LIST (both admin and teachers can view)
    Route::get('/teacher/list/{school_id}', [TeacherController::class, 'list'])->middleware('school-isolation');
    Route::get('/teacher/show/{teacher_id}', [TeacherController::class, 'show']);

    // STUDENT MANAGEMENT
    Route::middleware('role:admin')->group(function () {
        Route::post('/student/add', [StudentController::class, 'create']);
        Route::put('/student/update/{student_id}', [StudentController::class, 'update']);
        Route::delete('/student/delete/{student_id}', [StudentController::class, 'delete']);
    });

    Route::get('/student/list/{school_id}', [StudentController::class, 'list'])->middleware('school-isolation');
    Route::get('/student/show/{student_id}', [StudentController::class, 'show']);

    // ATTENDANCE MANAGEMENT
    Route::post('/attendance/student/mark', [AttendanceController::class, 'markStudentAttendance'])->middleware('role:admin');
    Route::get('/attendance/student/today/{school_id}', [AttendanceController::class, 'getStudentAttendanceToday'])->middleware('school-isolation');
    Route::get('/attendance/student/history/{student_id}', [AttendanceController::class, 'getStudentAttendanceHistory']);

    Route::post('/attendance/teacher/mark', [AttendanceController::class, 'markTeacherAttendance'])->middleware('role:admin');
    Route::get('/attendance/teacher/today/{school_id}', [AttendanceController::class, 'getTeacherAttendanceToday'])->middleware('school-isolation');
    Route::get('/attendance/teacher/history/{teacher_id}', [AttendanceController::class, 'getTeacherAttendanceHistory']);

    // FEES MANAGEMENT
    Route::post('/fees/add', [FeeController::class, 'create'])->middleware('role:admin');
    Route::put('/fees/update-payment/{fee_id}', [FeeController::class, 'updatePayment'])->middleware('role:admin');
    Route::get('/fees/student/{student_id}', [FeeController::class, 'getStudentFees']);
    Route::get('/fees/monthly/{school_id}/{month}/{year}', [FeeController::class, 'getMonthlyFees'])->middleware('school-isolation');

    // SALARY MANAGEMENT
    Route::post('/salary/calculate', [SalaryController::class, 'calculate'])->middleware('role:admin');
    Route::put('/salary/mark-paid/{salary_id}', [SalaryController::class, 'markAsPaid'])->middleware('role:admin');
    Route::get('/salary/monthly/{school_id}/{month}/{year}', [SalaryController::class, 'getMonthlySalaries'])->middleware('school-isolation');
    Route::get('/salary/teacher/{teacher_id}', [SalaryController::class, 'getTeacherSalaries']);

    // REPORTS
    Route::get('/reports/attendance/daily/{school_id}', [ReportController::class, 'exportAttendanceDaily'])->middleware('role:admin');
    Route::get('/reports/fees/monthly/{school_id}/{month}/{year}', [ReportController::class, 'exportFeesMonthly'])->middleware('role:admin');
    Route::get('/reports/salary/monthly/{school_id}/{month}/{year}', [ReportController::class, 'exportSalaryMonthly'])->middleware('role:admin');
});
