<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Salary;
use Illuminate\Http\Request;

class SalaryController extends Controller
{
    public function calculate(Request $request)
    {
        $validated = $request->validate([
            'school_id' => 'required|integer|exists:schools,id',
            'teacher_id' => 'required|integer|exists:teachers,id',
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2000|max:2099',
            'bonus' => 'nullable|numeric|min:0',
            'deduction' => 'nullable|numeric|min:0',
        ]);

        $teacher = \App\Models\Teacher::findOrFail($validated['teacher_id']);
        $baseSalary = $teacher->salary;
        $bonus = $validated['bonus'] ?? 0;
        $deduction = $validated['deduction'] ?? 0;
        $netSalary = $baseSalary + $bonus - $deduction;

        $salary = Salary::updateOrCreate(
            [
                'school_id' => $validated['school_id'],
                'teacher_id' => $validated['teacher_id'],
                'month' => $validated['month'],
                'year' => $validated['year'],
            ],
            [
                'base_salary' => $baseSalary,
                'bonus' => $bonus,
                'deduction' => $deduction,
                'net_salary' => $netSalary,
                'status' => 'pending',
            ]
        );

        return response()->json([
            'message' => 'Salary calculated successfully',
            'salary' => $salary,
        ], 201);
    }

    public function getMonthlySalaries($schoolId, $month, $year)
    {
        $salaries = Salary::with('teacher.user')
            ->where('school_id', $schoolId)
            ->where('month', $month)
            ->where('year', $year)
            ->get();

        return response()->json([
            'month' => $month,
            'year' => $year,
            'salaries' => $salaries,
        ], 200);
    }

    public function getTeacherSalaries($teacherId)
    {
        $salaries = Salary::where('teacher_id', $teacherId)
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        return response()->json([
            'teacher_id' => $teacherId,
            'salaries' => $salaries,
        ], 200);
    }

    public function markAsPaid(Request $request, $salaryId)
    {
        $validated = $request->validate([
            'paid_date' => 'nullable|date',
        ]);

        $salary = Salary::findOrFail($salaryId);
        $salary->update([
            'status' => 'paid',
            'paid_date' => $validated['paid_date'] ?? now()->toDateString(),
        ]);

        return response()->json([
            'message' => 'Salary marked as paid',
            'salary' => $salary,
        ], 200);
    }
}
