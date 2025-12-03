<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Fee;
use Illuminate\Http\Request;

class FeeController extends Controller
{
    public function create(Request $request)
    {
        $validated = $request->validate([
            'school_id' => 'required|integer|exists:schools,id',
            'student_id' => 'required|integer|exists:students,id',
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2000|max:2099',
            'amount' => 'required|numeric|min:0',
            'due_date' => 'nullable|date',
            'remarks' => 'nullable|string',
        ]);

        $fee = Fee::updateOrCreate(
            [
                'school_id' => $validated['school_id'],
                'student_id' => $validated['student_id'],
                'month' => $validated['month'],
                'year' => $validated['year'],
            ],
            $validated
        );

        return response()->json([
            'message' => 'Fee created successfully',
            'fee' => $fee,
        ], 201);
    }

    public function getStudentFees($studentId)
    {
        $fees = Fee::where('student_id', $studentId)
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        return response()->json([
            'student_id' => $studentId,
            'fees' => $fees,
        ], 200);
    }

    public function getMonthlyFees($schoolId, $month, $year)
    {
        $fees = Fee::with('student')
            ->where('school_id', $schoolId)
            ->where('month', $month)
            ->where('year', $year)
            ->get();

        return response()->json([
            'month' => $month,
            'year' => $year,
            'fees' => $fees,
        ], 200);
    }

    public function updatePayment(Request $request, $feeId)
    {
        $validated = $request->validate([
            'paid_amount' => 'required|numeric|min:0',
            'payment_method' => 'nullable|string',
            'paid_date' => 'nullable|date',
        ]);

        $fee = Fee::findOrFail($feeId);

        // Calculate new total paid
        $newPaidAmount = $fee->paid_amount + $validated['paid_amount'];

        // Determine status
        $status = 'pending';
        if ($newPaidAmount >= $fee->amount) {
            $status = 'paid';
        } elseif ($newPaidAmount > 0) {
            $status = 'partial';
        }

        $fee->update([
            'paid_amount' => $newPaidAmount,
            'status' => $status,
            'payment_method' => $validated['payment_method'] ?? $fee->payment_method,
            'paid_date' => $validated['paid_date'] ?? now()->toDateString(),
        ]);

        return response()->json([
            'message' => 'Payment recorded successfully',
            'fee' => $fee,
        ], 200);
    }
}
