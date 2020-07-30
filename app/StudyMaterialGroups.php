<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudyMaterialGroups extends Model
{
    protected $fillable = [
        'group_name','school_id','year_id','class_id','subject_id'
    ];
    
    public function class(){
        return $this->belongsTo(Classes::class,'class_id');
    }

    public function material(){
        return $this->hasMany(StudyMaterial::class,'group_id')->with('attachments');;
    }

    public function subject(){
        return $this->belongsTo(Subjects::class,'subject_id');
    }
}
