<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $fillable = [
        'empid', 'relative_name', 'staff_name','gender','email','address',
        'qualification','dob','bloodgroup','emp_photo','experience_letter','id_proof',
        'other_document1','other_document2','date_of_joining','pan_card_number','salary','aadhar_no',
        'bank_name','pf_no','pf_amount','tds_amount','professional_tax','da_amount',
        'hra_amount','casual_leave','pay_earn_leave','sick_leave','other_leave','contact_no','designation','blood_group',
        'aadhar_card','bank_number','salary_remark','other_documents1','other_documents2','school_id','year_id'
    ];

    public function designationType(){
        switch($this->attributes['designation']){
            case 1:
                return "teacher";
            case 2:
                 return "non-teaching";
            case 3:
                return "clerk";
        }
    }
    public function profile() 
    { 
        return $this->morphOne('App\User', 'profile');
    }
}
