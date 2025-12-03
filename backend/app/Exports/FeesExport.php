<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;

class FeesExport implements FromCollection, WithHeadings, WithColumnWidths
{
    protected $fees;

    public function __construct($fees)
    {
        $this->fees = $fees;
    }

    public function collection()
    {
        return $this->fees->map(function ($record) {
            return [
                'Student ID' => $record->student_id,
                'Student Name' => $record->student->name ?? 'N/A',
                'Month' => $record->month,
                'Year' => $record->year,
                'Amount' => $record->amount,
                'Paid Amount' => $record->paid_amount,
                'Status' => strtoupper($record->status),
                'Due Date' => $record->due_date ?? '-',
                'Paid Date' => $record->paid_date ?? '-',
            ];
        });
    }

    public function headings(): array
    {
        return ['Student ID', 'Student Name', 'Month', 'Year', 'Amount', 'Paid Amount', 'Status', 'Due Date', 'Paid Date'];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 12,
            'B' => 25,
            'C' => 10,
            'D' => 10,
            'E' => 12,
            'F' => 12,
            'G' => 12,
            'H' => 12,
            'I' => 12,
        ];
    }
}
