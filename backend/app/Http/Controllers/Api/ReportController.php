<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AttendanceStudent;
use App\Models\Fee;
use App\Models\Salary;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AttendanceExport;
use App\Exports\FeesExport;
use App\Exports\SalaryExport;

class ReportController extends Controller
{
    public function exportAttendanceDaily($schoolId)
    {
        $today = now()->toDateString();
        $attendance = AttendanceStudent::with('student')
            ->where('school_id', $schoolId)
            ->where('attendance_date', $today)
            ->get();

        $fileName = "attendance_{$schoolId}_{$today}.xlsx";

        return Excel::download(new AttendanceExport($attendance), $fileName);
    }

    public function exportFeesMonthly($schoolId, $month, $year)
    {
        $fees = Fee::with('student')
            ->where('school_id', $schoolId)
            ->where('month', $month)
            ->where('year', $year)
            ->get();

        $fileName = "fees_{$schoolId}_{$year}_{$month}.xlsx";

        return Excel::download(new FeesExport($fees), $fileName);
    }

    public function exportSalaryMonthly($schoolId, $month, $year)
    {
        $salaries = Salary::with('teacher.user')
            ->where('school_id', $schoolId)
            ->where('month', $month)
            ->where('year', $year)
            ->get();

        $fileName = "salary_{$schoolId}_{$year}_{$month}.xlsx";

        return Excel::download(new SalaryExport($salaries), $fileName);
    }
}
