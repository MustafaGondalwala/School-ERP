<?php

namespace App\Http\Middleware;

use Closure;

class TeacherUserTypeCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
         $user_type = $request->header('Auth-User-Type');
        if($user_type != "teacher"){
          $response = [
            'message'=>"User UnAuthenticate"
          ];
          return response()->json($user_type, 401);
        }
        return $next($request);
    }
}