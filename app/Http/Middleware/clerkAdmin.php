<?php

namespace App\Http\Middleware;

use Closure;

class clerkAdmin
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
        if($user_type != "1" && $user_type != "5"){
          $response = [
            'message'=>"User unauthenticate"
          ];
          return response()->json(["error"=>["message"=>"User UnAuthenticate"]],401);
        }
        return $next($request);
    }
}
