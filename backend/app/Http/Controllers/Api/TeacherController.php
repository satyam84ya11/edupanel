<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class TeacherController extends Controller
{
    /**
     * Create a new teacher account (ADMIN ONLY)
     * Only admin can create teacher and set password
     */
    public function create(Request $request)
    {
        $validated = $request->validate([
            'school_id' => 'required|integer|exists:schools,id',
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->where('school_id', $request->school_id),
            ],
            'password' => 'required|min:8|confirmed',
            'subject' => 'required|string|max:255',
            'salary' => 'required|numeric|min:0',
            'join_date' => 'nullable|date',
            'qualification' => 'nullable|string|max:255',
        ]);

        // Create user account with admin-provided password
        $user = User::create([
            'school_id' => $validated['school_id'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'teacher',
            'is_active' => true,
        ]);

        // Create teacher profile
        $teacher = Teacher::create([
            'user_id' => $user->id,
            'school_id' => $validated['school_id'],
            'subject' => $validated['subject'],
            'salary' => $validated['salary'],
            'join_date' => $validated['join_date'] ?? now()->toDateString(),
            'qualification' => $validated['qualification'] ?? null,
            'is_active' => true,
        ]);

        return response()->json([
            'message' => 'Teacher account created successfully',
            'teacher' => [
                'id' => $teacher->id,
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'subject' => $teacher->subject,
                'salary' => $teacher->salary,
                'join_date' => $teacher->join_date,
            ],
        ], 201);
    }

    /**
     * Get all teachers for a school
     */
    public function list(Request $request, $schoolId)
    {
        $teachers = Teacher::with('user')
            ->where('school_id', $schoolId)
            ->where('is_active', true)
            ->get()
            ->map(function ($teacher) {
                return [
                    'id' => $teacher->id,
                    'user_id' => $teacher->user_id,
                    'name' => $teacher->user->name,
                    'email' => $teacher->user->email,
                    'subject' => $teacher->subject,
                    'salary' => $teacher->salary,
                    'join_date' => $teacher->join_date,
                    'qualification' => $teacher->qualification,
                    'is_active' => $teacher->is_active,
                ];
            });

        return response()->json([
            'message' => 'Teachers retrieved successfully',
            'teachers' => $teachers,
        ], 200);
    }

    /**
     * Reset teacher password (ADMIN ONLY)
     * Admin can reset any teacher's password
     */
    public function resetPassword(Request $request, $teacherId)
    {
        $validated = $request->validate([
            'new_password' => 'required|min:8|confirmed',
        ]);

        $teacher = Teacher::findOrFail($teacherId);
        $user = $teacher->user;

        // Update password
        $user->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return response()->json([
            'message' => 'Password reset successfully for ' . $user->name,
            'teacher' => [
                'id' => $teacher->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ], 200);
    }

    /**
     * Get single teacher details
     */
    public function show($teacherId)
    {
        $teacher = Teacher::with('user')->findOrFail($teacherId);

        return response()->json([
            'teacher' => [
                'id' => $teacher->id,
                'user_id' => $teacher->user_id,
                'name' => $teacher->user->name,
                'email' => $teacher->user->email,
                'subject' => $teacher->subject,
                'salary' => $teacher->salary,
                'join_date' => $teacher->join_date,
                'qualification' => $teacher->qualification,
                'bio' => $teacher->bio,
                'is_active' => $teacher->is_active,
            ],
        ], 200);
    }

    /**
     * Update teacher details (subject, salary, etc - NOT credentials)
     */
    public function update(Request $request, $teacherId)
    {
        $validated = $request->validate([
            'subject' => 'nullable|string|max:255',
            'salary' => 'nullable|numeric|min:0',
            'qualification' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
        ]);

        $teacher = Teacher::findOrFail($teacherId);
        $teacher->update($validated);

        return response()->json([
            'message' => 'Teacher updated successfully',
            'teacher' => $teacher,
        ], 200);
    }

    /**
     * Deactivate/Delete teacher (ADMIN ONLY)
     */
    public function delete(Request $request, $teacherId)
    {
        $teacher = Teacher::findOrFail($teacherId);
        $user = $teacher->user;

        // Soft delete by deactivating
        $teacher->update(['is_active' => false]);
        $user->update(['is_active' => false]);

        return response()->json([
            'message' => 'Teacher account deactivated successfully',
        ], 200);
    }
}
