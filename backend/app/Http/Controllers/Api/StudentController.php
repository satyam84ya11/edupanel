<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class StudentController extends Controller
{
    public function list($schoolId)
    {
        $students = Student::where('school_id', $schoolId)
            ->where('is_active', true)
            ->get();

        return response()->json([
            'message' => 'Students retrieved successfully',
            'students' => $students,
        ], 200);
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'school_id' => 'required|integer|exists:schools,id',
            'name' => 'required|string|max:255',
            'roll_number' => 'required|string|unique:students',
            'class' => 'required|string|max:50',
            'section' => 'nullable|string|max:50',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:20',
            'parent_phone' => 'nullable|string|max:20',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|string|in:male,female,other',
            'address' => 'nullable|string',
            'admission_date' => 'nullable|date',
        ]);

        $student = Student::create($validated);

        return response()->json([
            'message' => 'Student added successfully',
            'student' => $student,
        ], 201);
    }

    public function update(Request $request, $studentId)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'class' => 'nullable|string|max:50',
            'section' => 'nullable|string|max:50',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:20',
            'parent_phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        $student = Student::findOrFail($studentId);
        $student->update($validated);

        return response()->json([
            'message' => 'Student updated successfully',
            'student' => $student,
        ], 200);
    }

    public function show($studentId)
    {
        $student = Student::findOrFail($studentId);

        return response()->json([
            'student' => $student,
        ], 200);
    }

    public function delete($studentId)
    {
        $student = Student::findOrFail($studentId);
        $student->update(['is_active' => false]);

        return response()->json([
            'message' => 'Student deleted successfully',
        ], 200);
    }
}
