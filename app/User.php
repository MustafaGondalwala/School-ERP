<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','login_text','school_id','user_type','password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    public function school(){
        return $this->belongsTo('App\SchoolInfo','school_id');
    }

    public function teacher(){
        return $this->belongsTo('App\Teacher','login_text','empid');
    }

    public function studyMaterialGroups(){
        return $this->morphMany(StudyMaterialGroups::class, 'teacher')->with('class','subject','material');
    }
    public function questionpapers()
    {
        return $this->morphMany(QuestionPaper::class, 'created_by')->with('class','subject','question');
    }
    public function onlineexam()
    {
        return $this->morphMany(OnlineExam::class, 'created_by')->with('class','questionpaper','monthyTestType','examType','teacher')->orderBy('exam_date');
    }
    public function onlineexamWithStudentAnswers()
    {
        return $this->morphMany(OnlineExam::class, 'created_by')->with('class','questionpaper','monthyTestType','examType','withStudentAnswers')->orderBy('exam_date');
    }

    public function childs(){
        return StudentInfo::where('parent_id',$this->profile_id)->get();
    }
    public function year(){
        return $this->belongsTo(SystemYear::class,'year_id');
    }
    public function profile(){
        return $this->morphTo();
    }
}
