<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudyMaterialGroups extends Model
{
    protected $fillable = [
        'group_name'
    ];
    public function materials(){
        return $this->hasMany('App\StudyMaterial','group_id')->with('attachments','user');
    }
}
