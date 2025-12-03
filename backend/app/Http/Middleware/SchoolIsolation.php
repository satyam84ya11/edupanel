<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SchoolIsolation
{
    public function handle(Request $request, Closure $next): Response
    {
        $schoolId = $request->route('school_id') ?? $request->query('school_id');
        
        if ($schoolId && $request->user()) {
            if ($request->user()->school_id != $schoolId) {
                return response()->json(['error' => 'Forbidden. Access denied to this school'], 403);
            }
        }

        return $next($request);
    }
}
