<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        Commands\SendDailyAttendanceReport::class,
        Commands\SendMonthlyFeesReport::class,
        Commands\SendMonthlySalaryReport::class,
    ];

    protected function schedule(Schedule $schedule): void
    {
        // Send daily attendance report at 11:59 PM
        $schedule->command('reports:send-attendance-daily')
            ->dailyAt('23:59')
            ->withoutOverlapping()
            ->onFailure(function () {
                \Log::error('Failed to send daily attendance report');
            });

        // Send monthly fees report on the 1st of each month at 2:00 AM
        $schedule->command('reports:send-fees-monthly')
            ->monthlyOn(1, '02:00')
            ->withoutOverlapping();

        // Send monthly salary report on the 1st of each month at 3:00 AM
        $schedule->command('reports:send-salary-monthly')
            ->monthlyOn(1, '03:00')
            ->withoutOverlapping();
    }

    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
