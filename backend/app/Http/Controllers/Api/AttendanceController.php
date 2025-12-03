<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AttendanceStudent;
use App\Models\AttendanceTeacher;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    // STUDENT ATTENDANCE

    public function markStudentAttendance(Request $request)
    {
        $validated = $request->validate([
            'school_id' => 'required|integer|exists:schools,id',
            'student_id' => 'required|integer|exists:students,id',
            'attendance_date' => 'required|date',
            'status' => 'required|string|in:present,absent,leave',
            'remarks' => 'nullable|string',
        ]);

        $attendance = AttendanceStudent::updateOrCreate(
            [
                'school_id' => $validated['school_id'],
                'student_id' => $validated['student_id'],
                'attendance_date' => $validated['attendance_date'],
            ],
            [
                'status' => $validated['status'],
                'remarks' => $validated['remarks'] ?? null,
            ]
        );

        return response()->json([
            'message' => 'Attendance marked successfully',
            'attendance' => $attendance,
        ], 201);
    }

    public function getStudentAttendanceToday($schoolId)
    {
        $today = now()->toDateString();
        $attendance = AttendanceStudent::with('student')
            ->where('school_id', $schoolId)
            ->where('attendance_date', $today)
            ->get();

        return response()->json([
            'date' => $today,
            'attendance' => $attendance,
        ], 200);
    }

    public function getStudentAttendanceHistory($studentId)
    {
        $attendance = AttendanceStudent::where('student_id', $studentId)
            ->orderBy('attendance_date', 'desc')
            ->get();

        return response()->json([
            'student_id' => $studentId,
            'attendance' => $attendance,
        ], 200);
    }

    // TEACHER ATTENDANCE

    public function markTeacherAttendance(Request $request)
    {
        $validated = $request->validate([
            'school_id' => 'required|integer|exists:schools,id',
            'teacher_id' => 'required|integer|exists:teachers,id',
            'attendance_date' => 'required|date',
            'status' => 'required|string|in:present,absent,leave',
            'check_in' => 'nullable|date_format:H:i',
            'check_out' => 'nullable|date_format:H:i',
            'remarks' => 'nullable|string',
        ]);

        $attendance = AttendanceTeacher::updateOrCreate(
            [
                'school_id' => $validated['school_id'],
                'teacher_id' => $validated['teacher_id'],
                'attendance_date' => $validated['attendance_date'],
            ],
            [
                'status' => $validated['status'],
                'check_in' => $validated['check_in'] ?? null,
                'check_out' => $validated['check_out'] ?? null,
                'remarks' => $validated['remarks'] ?? null,
            ]
        );

        return response()->json([
            'message' => 'Attendance marked successfully',
            'attendance' => $attendance,
        ], 201);
    }

    public function getTeacherAttendanceToday($schoolId)
    {
        $today = now()->toDateString();
        $attendance = AttendanceTeacher::with('teacher.user')
            ->where('school_id', $schoolId)
            ->where('attendance_date', $today)
            ->get();

        return response()->json([
            'date' => $today,
            'attendance' => $attendance,
        ], 200);
    }

    public function getTeacherAttendanceHistory($teacherId)
    {
        $attendance = AttendanceTeacher::where('teacher_id', $teacherId)
            ->orderBy('attendance_date', 'desc')
            ->get();

        return response()->json([
            'teacher_id' => $teacherId,
            'attendance' => $attendance,
        ], 200);
    }
}
