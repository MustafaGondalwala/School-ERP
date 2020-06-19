<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use \Carbon\Carbon;
class RegisterStudent extends Model
{
    protected $fillable = [
        '*'
    ];
    protected $dateFormat = 'U';
    //
    // public function properCreated(){
    //     return Carbon::createFromFormat('Y-m-d H:i:s', $this->created_at)->format('Y-m-d');
    // }
}
