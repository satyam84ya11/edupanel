<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id', 'name', 'email', 'roll_number', 'class', 'section',
        'phone', 'parent_phone', 'date_of_birth', 'gender', 'address',
        'admission_date', 'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'date_of_birth' => 'date',
        'admission_date' => 'date',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function attendances()
    {
        return $this->hasMany(AttendanceStudent::class);
    }

    public function fees()
    {
        return $this->hasMany(Fee::class);
    }
}
