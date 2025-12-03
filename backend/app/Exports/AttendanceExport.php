<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;

class AttendanceExport implements FromCollection, WithHeadings, WithColumnWidths
{
    protected $attendance;

    public function __construct($attendance)
    {
        $this->attendance = $attendance;
    }

    public function collection()
    {
        return $this->attendance->map(function ($record) {
            return [
                'Student ID' => $record->student_id,
                'Student Name' => $record->student->name ?? 'N/A',
                'Date' => $record->attendance_date,
                'Status' => strtoupper($record->status),
                'Remarks' => $record->remarks ?? '-',
            ];
        });
    }

    public function headings(): array
    {
        return ['Student ID', 'Student Name', 'Date', 'Status', 'Remarks'];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 12,
            'B' => 25,
            'C' => 15,
            'D' => 15,
            'E' => 30,
        ];
    }
}
