<?php

namespace App\Http\Middleware;

use Closure;

class AdminUserTypeCheck
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
        if($user_type != "admin"){
          $response = [
            'message'=>"User UnAuthenticate"
          ];
          return response()->json($user_type, 401);
        }
        return $next($request);
    }
}
