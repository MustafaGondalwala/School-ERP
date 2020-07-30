<?php

use Illuminate\Database\Seeder;

use App\SchoolInfo;
use Faker\Factory as Faker;
use App\Classes;
use App\AdminInfo;
use App\User;
use Illuminate\Support\Facades\DB;
use App\Subjects;
use App\FeeInstallments;
use App\SystemYear;
use App\StudentInfo;
use App\ParentInfo;
use App\Staff;
use App\Teacher;
use App\EmpID;
use App\RegisterStudent;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $password = "admin";
        $new_school_info = new SchoolInfo;
        $new_school_info->name = "Burhani English School";
        $new_school_info->email = "burhanienglishschool@gmail.com";
        $new_school_info->location = "Sidhpur";
        $new_school_info->unique_id_code = "BS";
        $new_school_info->message_code = "Burhani-English-School";
        $new_school_info->package_type = "1";
        $new_school_info->front_pic = "/storage/uploads/images/our.jpg";
        $new_school_info->year_id = "1";
        $new_school_info->save();
        $school_id = $new_school_info->id;

        $gender_array = array('male','female','other');
        $class_array = array('1','2','3','4','5','6','7');
        $class_array_name = array('5th','6th','7th','8th','9th','10th','12th');
        $religion = array('hindu','muslim','sikh','jain');
        $caste = array('general','sc','st','obc','other');

        $newyear = new SystemYear;
        $newyear->year = "2020-21";
        $newyear->school_id = $school_id;
        $newyear->save();
        $year_id = $newyear->id;
        $empid = new EmpID;

        $empid->school_id = $school_id;
        $empid->empid = 0;
        $empid->save();
        SystemYear::insert(
            array(
                array("year"=>"2019-20","school_id"=>$school_id),
                array("year"=>"2018-19","school_id"=>$school_id),
                array("year"=>"2017-18","school_id"=>$school_id),
                array("year"=>"2016-17","school_id"=>$school_id),
            )
        );
        Classes::insert(
            array(
                array("class_title"=>"5th","year_id"=>$year_id,"school_id"=>$school_id,"section"=>"B"),
                array("class_title"=>"5th","year_id"=>$year_id,"school_id"=>$school_id,"section"=>"A"),
                array("class_title"=>"6th","year_id"=>$year_id,"school_id"=>$school_id,"section"=>"A"),
                array("class_title"=>"7th","year_id"=>$year_id,"school_id"=>$school_id,"section"=>"A"),
                array("class_title"=>"8th","year_id"=>$year_id,"school_id"=>$school_id,"section"=>"A"),
                array("class_title"=>"9th","year_id"=>$year_id,"school_id"=>$school_id,"section"=>"A"),
            )
        );
        AdminInfo::insert(
            array(
                array('name'=>"Mustafa","school_id"=>$school_id)
            )
        );
        User::insert(
            array(
                array('name'=>"mustafa",
                    "login_text"=>"admin",
                    "school_id"=>$school_id,
                    "password"=>bcrypt($password),
                    "user_type"=>1,
                    "year_id"=>$year_id
                )
            )
        );
        
        foreach(range(1,10) as $index){

            $teacher = new Teacher;
            $teacher->empid = "E".$faker->numberBetween($min = 3000, $max = 90000);
            $teacher->teacher_name = $faker->name;
            $teacher->school_id = $school_id;
            $teacher->year_id = $year_id;
            $teacher->save();
            $teacher->user()->create([
                "designation"=>1,
                "year_id"=>$year_id,
                "empid"=> "E".$faker->numberBetween($min = 3000, $max = 90000),
                "email"=>$faker->unique()->email,
                "salary"=>$faker->numberBetween($min = 3000, $max = 90000),
                'date_of_joining'=>$faker->date($format = 'Y-m-d', $max = 'now'),
                "relative_name"=>$faker->name,
                "staff_name"=>$faker->name,
                "gender"=>$gender_array[$faker->numberBetween($min = 0, $max = 1)],
                "address"=>$faker->city,
                "dob"=>$faker->date($format = 'Y-m-d', $max = 'now'),
                "contact_no"=>$faker->phoneNumber,
                "school_id"=>$school_id,
                "blood_group"=>"A+",
                "qualification"=>"b.com",
            ]);

            $teacher_login = new User;
            $teacher_login->name = $teacher->teacher_name;
            $teacher_login->login_text = $teacher->empid;
            $teacher_login->password = bcrypt($teacher->empid);
            $teacher_login->user_type = 4;
            $teacher_login->school_id = $school_id;
            $teacher_login->year_id = $year_id;
            $teacher_login->save();
        }
        foreach(range(1,200) as $index){
            $new_register = new RegisterStudent;
            $new_register->register_no = $faker->numberBetween($min = 3000, $max = 90000).$index;
            $new_register->class = $class_array[$faker->numberBetween($min = 0, $max = 6)];
            $new_register->student_name =   $faker->name;
            $new_register->father_name =  $faker->name;
            $new_register->mother_name =  $faker->name;
            $new_register->father_contact_no1 = $faker->phoneNumber;
            $new_register->father_contact_no2 = $faker->phoneNumber;
            $new_register->dob =  $faker->date($format = 'Y-m-d', $max = 'now');
            $new_register->student_address = $faker->city;
            $new_register->gender = $gender_array[$faker->numberBetween($min = 0, $max = 1)];
            $new_register->doA =$faker->date($format = 'Y-m-d', $max = 'now');
            $new_register->block = $faker->city;
            $new_register->district = $faker->city;
            $new_register->year_id = $school_id;
            $new_register->school_id = $year_id;
            $new_register->save();
        }

            $new_addmission = new StudentInfo;
            $new_addmission->school_id = $school_id;
            $new_addmission->roll_no = $faker->numberBetween($min = 3000, $max = 90000);
            $new_addmission->class_id = $class_array[$faker->numberBetween($min = 0, $max = 6)];
            $new_addmission->religion = $religion[$faker->numberBetween($min = 0, $max = 3)];
            $new_addmission->caste = $caste[$faker->numberBetween($min = 0, $max = 3)];
            $new_addmission->student_name = "student";
            $new_addmission->father_name = $faker->name;
            $new_addmission->mother_name = $faker->name;
            $new_addmission->father_contact_no1 = $faker->phoneNumber;
            $new_addmission->father_contact_no2 = $faker->phoneNumber;
            $new_addmission->father_email = $faker->unique()->email;
            $new_addmission->student_email =$faker->unique()->email;
            $new_addmission->dob =  $faker->date($format = 'Y-m-d', $max = 'now');
            $new_addmission->age = $faker->numberBetween($min = 5, $max = 25);
            $new_addmission->gender = "male";
            $new_addmission->year_id = $year_id;
            $new_addmission->save();

            $new_addmission->address()->create([
                'student_address'=>$faker->city,
                'place'=>$faker->city,
                'block'=>$faker->city,
                'district'=>$faker->city,
                'state'=>$faker->city,
                'landmark'=>$faker->city,
                'pincode'=>$faker->city,
                'student_info_id'=>$new_addmission->id
            ]);
            $new_addmission->documents()->create([
                'student_info_id'=>$new_addmission->id
            ]);
            $new_addmission->photos()->create([
                'student_info_id'=>$new_addmission->id
            ]);
            $new_student = new User;
            $new_student->name = $new_addmission->student_name;
            $new_student->login_text = $new_addmission->student_name;
            $new_student->school_id = $school_id;
            $new_student->year_id = $year_id;
            $new_student->password = bcrypt($new_addmission->student_name);
            $new_student->user_type = 2;
            $new_student->save();

            $new_parent = new User;
            $new_parent->name = $new_addmission->father_name;
            $new_parent->login_text = $new_addmission->father_name;
            $new_parent->school_id = $school_id;
            $new_parent->year_id = $year_id;
            $new_parent->password = bcrypt($new_addmission->father_name);
            $new_parent->user_type = 3;
            $new_parent->save();

            $new_parentInfo = new ParentInfo;
            $new_parentInfo->name = $new_addmission->father_name;
            $new_parentInfo->mobile_no = $new_addmission->father_contact_no1;
            $new_parentInfo->school_id = $school_id;
            $new_parentInfo->year_id = $year_id;
            $new_parentInfo->save();
            

            $new_parentInfo = new ParentInfo;
            $new_parentInfo->name = $new_addmission->father_name;
            $new_parentInfo->mobile_no = $new_addmission->father_contact_no1;
            $new_parentInfo->school_id = $school_id;
            $new_parentInfo->year_id = $year_id;
            $new_parentInfo->save();

                
            $new_addmission->parent_id = $new_parentInfo->id;
            $new_addmission->update();








       foreach(range(1,200) as $index){
        try{

            $new_addmission = new StudentInfo;
            $new_addmission->school_id = $school_id;
            $new_addmission->roll_no = $faker->numberBetween($min = 3000, $max = 90000);
            $new_addmission->class_id = $class_array[$faker->numberBetween($min = 0, $max = 6)];
            $new_addmission->religion = $religion[$faker->numberBetween($min = 0, $max = 3)];
            $new_addmission->caste = $caste[$faker->numberBetween($min = 0, $max = 3)];
            $new_addmission->student_name = $faker->name;
            $new_addmission->father_name = $faker->name;
            $new_addmission->mother_name = $faker->name;
            $new_addmission->father_contact_no1 = $faker->phoneNumber;
            $new_addmission->father_contact_no2 = $faker->phoneNumber;
            $new_addmission->father_email = $faker->unique()->email;
            $new_addmission->student_email =$faker->unique()->email;
            $new_addmission->dob =  $faker->date($format = 'Y-m-d', $max = 'now');
            $new_addmission->age = $faker->numberBetween($min = 5, $max = 25);
            $new_addmission->gender = "male";
            $new_addmission->year_id = $year_id;
            $new_addmission->save();

            $new_addmission->address()->create([
                'student_address'=>$faker->city,
                'place'=>$faker->city,
                'block'=>$faker->city,
                'district'=>$faker->city,
                'state'=>$faker->city,
                'landmark'=>$faker->city,
                'pincode'=>$faker->city,
                'student_info_id'=>$new_addmission->id
            ]);
            $new_addmission->documents()->create([
                'student_info_id'=>$new_addmission->id
            ]);
            $new_addmission->photos()->create([
                'student_info_id'=>$new_addmission->id
            ]);
            $new_student = new User;
            $new_student->name = $new_addmission->student_name;
            $new_student->login_text = $new_addmission->roll_no;
            $new_student->school_id = $school_id;
            $new_student->year_id = $year_id;
            $new_student->password = bcrypt($new_addmission->roll_no);
            $new_student->user_type = 2;
            $new_student->save();



            $new_parent = new User;
            $new_parent->name = $new_addmission->father_name;
            $new_parent->login_text = $new_addmission->father_contact_no1;
            $new_parent->school_id = $school_id;
            $new_parent->year_id = $year_id;
            $new_parent->password = bcrypt($new_addmission->father_contact_no1);
            $new_parent->user_type = 3;
            $new_parent->save();


            $new_parentInfo = new ParentInfo;
            $new_parentInfo->name = $new_addmission->father_name;
            $new_parentInfo->mobile_no = $new_addmission->father_contact_no1;
            $new_parentInfo->school_id = $school_id;
            $new_parentInfo->year_id = $year_id;
            $new_parentInfo->save();

                
            $new_addmission->parent_id = $new_parentInfo->id;
            $new_addmission->update();

            }catch(\Exception $e){
                echo $e->getMessage();
            }
        }
    }
}
