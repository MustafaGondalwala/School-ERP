<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Clerk;
use App\User;
use \DB;

class ClerkController extends Controller
{
    public function changePassword(Request $request){
        $request->validate([
            'clerk_id'=>'required|integer',
            'password'=>'required'
        ]);
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);

        $empid = Clerk::find($request->clerk_id)->empid;
        $updateData = User::where([
            'login_text'=>$empid,
            'school_id'=>$school_id,
            'year_id'=>$year_id,
        ])->update([
            'password'=>bcrypt($request->password)
        ]);
        if($updateData == true){
            return $this->ReS(["message"=>"Clerk Password Changed !!"]);
        }else{
            return $this->ReE(["message"=>"Error Occurred !!"]);
        }
    }
    public function getAllClerk(Request $request){
        $school_id = $this->getSchoolId($request);
        $clerkData = Clerk::with('user')->where('school_id',$school_id)->get();
        return $this->ReS(['clerk'=>$clerkData]);
    }
    public function addClerk(Request $request){
        if($request->id){
            $request->validate([
                'empid'=>'required|string',
                'clerk_name'=>'required|string',
                'gender'=>'required|string',
                'relative_name'=>'required|string',
                'contact_no'=>'required|string',
                'qualification'=>'required|string',
                'address'=>'required|string',
                'dob'=>'required|string',
                'salary'=>'required|string',
                'date_of_joining'=>'required|string'
            ]);
        }else{
            $request->validate([
                'empid'=>'required|string|unique:staff',
                'clerk_name'=>'required|string',
                'gender'=>'required|string',
                'relative_name'=>'required|string',
                'contact_no'=>'required|string|unique:staff',
                'qualification'=>'required|string',
                'address'=>'required|string',
                'dob'=>'required|string',
                'salary'=>'required|string',
                'send_sms'=>'required|string',
                'date_of_joining'=>'required|string'
            ]);
        }
        $school_id = $this->getSchoolId($request);
        $year_id = $this->getSchoolYearId($request);
        $schoolCode = $this->getSchoolUniqueCode($school_id);
        DB::beginTransaction();
        // try {
            if($request->id)
                $clerk = Clerk::find($request->id);
            else
                $clerk = new Clerk;
            $clerk->empid = $schoolCode.'-'.$request->empid;
            $clerk->clerk_name = $request->clerk_name;
            $clerk->school_id = $school_id;
            if($request->id)
                $clerk->update();
            else
                $clerk->save();
            
            $emp_photo = NULL;
            $id_proof = NULL;
            $experience_letter = NULL;
            $other_documents1 = NULL;
            $other_documents2 = NULL;    

            $emp_photo = $this->fetchCorrectPhoto($request->emp_photo);
            $id_proof = $this->fetchCorrectPhoto($request->id_proof);
            $experience_letter = $this->fetchCorrectPhoto($request->experience_letter);
            $other_documents1 = $this->fetchCorrectPhoto($request->other_documents1);
            $other_documents2 = $this->fetchCorrectPhoto($request->other_documents2);
            if($request->id){
                $clerk->user()->update([
                    "designation"=>2,
                    "empid"=>$request->empid,
                    "email"=>$request->email,
                    "salary"=>$request->salary,
                    'date_of_joining'=>$request->date_of_joining,
                    "relative_name"=>$request->relative_name,
                    "staff_name"=>$request->clerk_name,
                    "gender"=>$request->gender,
                    "address"=>$request->address,
                    "dob"=>$request->dob,
                    "contact_no"=>$request->contact_no,
                    "school_id"=>$school_id,
                    "blood_group"=>$request->blood_group,
                    "qualification"=>$request->qualification,
                    "aadhar_card"=>$request->aadhar_card,
                    "bank_name"=>$request->bank_name,
                    "bank_number"=>$request->bank_number,
                    "pan_card_number"=>$request->pan_card_number,
                    "pf_no"=>$request->pf_no,
                    "pf_amount"=>$request->pf_amount,
                    'tds_amount'=>$request->tds_amount,
                    "professional_tax"=>$request->professional_tax,
                    "da_amount"=>$request->da_amount,
                    "hra_amount"=>$request->hra_amount,
                    "salary_remark"=>$request->salary_remark,
                    "casual_leave"=>$request->casual_leave,
                    "pay_earn_leave"=>$request->pay_earn_leave,
                    "sick_leave"=>$request->sick_leave,
                    "other_leave"=>$request->other_leave,
                    "emp_photo"=>$emp_photo,
                    "experience_letter"=>$experience_letter,
                    "id_proof"=>$id_proof,
                    "year_id"=>$year_id,
                    "other_documents1"=>$other_documents1,
                    "other_documents2"=>$other_documents2,
                ]);
            }else{
                $clerk->user()->create([
                    "designation"=>2,
                    "empid"=>$request->empid,
                    "email"=>$request->email,
                    "salary"=>$request->salary,
                    'date_of_joining'=>$request->date_of_joining,
                    "relative_name"=>$request->relative_name,
                    "staff_name"=>$request->clerk_name,
                    "gender"=>$request->gender,
                    "address"=>$request->address,
                    "dob"=>$request->dob,
                    "contact_no"=>$request->contact_no,
                    "school_id"=>$school_id,
                    "blood_group"=>$request->blood_group,
                    "qualification"=>$request->qualification,
                    "aadhar_card"=>$request->aadhar_card,
                    "bank_name"=>$request->bank_name,
                    "bank_number"=>$request->bank_number,
                    "pan_card_number"=>$request->pan_card_number,
                    "pf_no"=>$request->pf_no,
                    "pf_amount"=>$request->pf_amount,
                    'tds_amount'=>$request->tds_amount,
                    "professional_tax"=>$request->professional_tax,
                    "da_amount"=>$request->da_amount,
                    "hra_amount"=>$request->hra_amount,
                    "salary_remark"=>$request->salary_remark,
                    "casual_leave"=>$request->casual_leave,
                    "pay_earn_leave"=>$request->pay_earn_leave,
                    "sick_leave"=>$request->sick_leave,
                    "other_leave"=>$request->other_leave,
                    "emp_photo"=>$emp_photo,
                    "experience_letter"=>$experience_letter,
                    "id_proof"=>$id_proof,
                    "year_id"=>$year_id,
                    "other_documents1"=>$other_documents1,
                    "other_documents2"=>$other_documents2,
                ]);
            }

            if($request->id){
                $clerk_login = User::where('login_text',$request->empid)->where('school_id',$school_id)->first();
                dd($clerk_login);
            }else{
                $clerk_login = new User;
            }
            $clerk_login->name = $clerk->clerk_name;
            $clerk_login->login_text = $clerk->empid;
            $clerk_login->password = bcrypt($clerk->empid);
            $clerk_login->user_type = 5;
            $clerk_login->school_id = $school_id;
            $clerk_login->year_id = $year_id;
            if($request->id)
                $clerk_login->update();
            else
                $clerk_login->save();
            DB::commit();
        // } catch (\Exception $e) {
        //     DB::rollback();
        //     return $this->ReE(["message"=>$e->getMessage()]);
        // }
        
        return $this->ReS(["message"=>"Data Updated!!"]);
    }
}
