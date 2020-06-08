<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $fillable = [
        'empid', 'relative_name', 'staff_name','gender','email','address',
        'qualification','dob','bloodgroup','staff_photo','experience_letter','id_proof',
        'other_document1','other_document2','date_of_joining','pan_card_no','salary','aadhar_no',
        'bank_name','bank_ifc_no','bank_account_no','pf_no','pf_amount','tds_amount','professional_tax_amount_monthly','da_amount_monthly',
        'hra_amount_monthly','remark','casual_leave','pay_earn_leave','sick_leave','other_leave','contact_no'
    ];

    public function profile() 
    { 
        return $this->morphOne('App\User', 'profile');
    }
}
