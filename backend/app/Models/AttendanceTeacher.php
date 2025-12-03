<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceTeacher extends Model
{
    use HasFactory;

    protected $fillable = ['school_id', 'teacher_id', 'attendance_date', 'status', 'check_in', 'check_out', 'remarks'];

    protected $casts = [
        'attendance_date' => 'date',
        'check_in' => 'time',
        'check_out' => 'time',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
