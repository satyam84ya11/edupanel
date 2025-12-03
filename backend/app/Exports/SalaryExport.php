<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;

class SalaryExport implements FromCollection, WithHeadings, WithColumnWidths
{
    protected $salaries;

    public function __construct($salaries)
    {
        $this->salaries = $salaries;
    }

    public function collection()
    {
        return $this->salaries->map(function ($record) {
            return [
                'Teacher ID' => $record->teacher_id,
                'Teacher Name' => $record->teacher->user->name ?? 'N/A',
                'Month' => $record->month,
                'Year' => $record->year,
                'Base Salary' => $record->base_salary,
                'Bonus' => $record->bonus,
                'Deduction' => $record->deduction,
                'Net Salary' => $record->net_salary,
                'Status' => strtoupper($record->status),
                'Paid Date' => $record->paid_date ?? '-',
            ];
        });
    }

    public function headings(): array
    {
        return ['Teacher ID', 'Teacher Name', 'Month', 'Year', 'Base Salary', 'Bonus', 'Deduction', 'Net Salary', 'Status', 'Paid Date'];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 12,
            'B' => 25,
            'C' => 10,
            'D' => 10,
            'E' => 15,
            'F' => 12,
            'G' => 12,
            'H' => 15,
            'I' => 12,
            'J' => 12,
        ];
    }
}
