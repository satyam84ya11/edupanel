<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'logo', 'address', 'phone', 'email', 'theme_color', 'is_active'];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function teachers()
    {
        return $this->hasMany(Teacher::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function attendanceStudents()
    {
        return $this->hasMany(AttendanceStudent::class);
    }

    public function attendanceTeachers()
    {
        return $this->hasMany(AttendanceTeacher::class);
    }

    public function fees()
    {
        return $this->hasMany(Fee::class);
    }

    public function salaries()
    {
        return $this->hasMany(Salary::class);
    }
}
