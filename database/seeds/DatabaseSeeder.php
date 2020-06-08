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
        $password = "mustafas1";
        $gender_array = array('male','female','other');
        $class_array = array('1','2','3','4','5','6','7');
        $religion = array('hindu','muslim','sikh','jain');
        $caste = array('general','sc','st','obc','other');
        DB::beginTransaction();
        $new_school_info = new SchoolInfo;
        $new_school_info->name = "Burhani English School";
        $new_school_info->email = "burhanienglishschool@gmail.com";
        $new_school_info->location = "Sidhpur";
        $new_school_info->unique_id_code = "BS";
        $new_school_info->message_code = "BURHANI-ENGLISH-SCHOOL";
        $new_school_info->package_type = "1";
        $new_school_info->front_pic = "/upload/mmm.jpg";
        $new_school_info->save();
        $school_id = $new_school_info->id;
        Classes::insert(
            array(
                array("class_title"=>"5th","school_info_id"=>$school_id,"section"=>"B"),
                array("class_title"=>"5th","school_info_id"=>$school_id,"section"=>"A"),
                array("class_title"=>"6th","school_info_id"=>$school_id,"section"=>"A"),
                array("class_title"=>"7th","school_info_id"=>$school_id,"section"=>"A"),
                array("class_title"=>"8th","school_info_id"=>$school_id,"section"=>"A"),
                array("class_title"=>"9th","school_info_id"=>$school_id,"section"=>"A"),
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
                    "login_text"=>"mustafagondalwala32@gmail.com",
                    "profile_id"=>1,
                    "profile_type"=>"App\AdminInfo",
                    "school_id"=>$school_id,
                    "password"=>bcrypt($password),
                    "user_type"=>1)
            )
        );
        Subjects::insert(
            array(
                array("subject_name"=>"English","school_info_id"=>$school_id),
                array("subject_name"=>"Math","school_info_id"=>$school_id),
                array("subject_name"=>"Gujarati","school_info_id"=>$school_id),
                array("subject_name"=>"Science","school_info_id"=>$school_id),
                array("subject_name"=>"General","school_info_id"=>$school_id),
            )
        );
        SystemYear::insert(
            array(
                array("school_info_id"=>$school_id,"year"=>"2019-20","selected"=>1),
                array("school_info_id"=>$school_id,"year"=>"2018-19","selected"=>0),
                array("school_info_id"=>$school_id,"year"=>"2017-18","selected"=>0),
                array("school_info_id"=>$school_id,"year"=>"2016-17","selected"=>0),
                array("school_info_id"=>$school_id,"year"=>"2015-16","selected"=>0),
            )
        );
        FeeInstallments::insert(
            array(
                array('school_info_id'=>$school_id,"installment"=>"Installment1"),
                array('school_info_id'=>$school_id,"installment"=>"Installment2"),
                array('school_info_id'=>$school_id,"installment"=>"Installment3"),
                array('school_info_id'=>$school_id,"installment"=>"Installment4"),
            )
        );
        foreach(range(1,6) as $index){
            $new_staff = new Staff;
            $new_staff->empid = "E".$faker->numberBetween($min = 3000, $max = 90000);
            $new_staff->relative_name = $faker->name;
            $new_staff->staff_name = $faker->name;
            $new_staff->gender = "male";
            $new_staff->email = $faker->unique()->email;
            $new_staff->address = $faker->city;
            $new_staff->dob = $faker->date($format = 'Y-m-d', $max = 'now');
            $new_staff->contact_no = $faker->phoneNumber;
            $new_staff->salary = $faker->numberBetween($min = 3000, $max = 90000);
            $new_staff->designation = "1";
            $new_staff->school_info_id = $school_id;
            
            $new_teacher = new Teacher;
            $new_teacher->empid = $new_staff->empid;
            $new_teacher->teacher_name = $new_staff->staff_name;
            $new_teacher->teacher_subject = "1,2";
            $new_teacher->teacher_class = "1,2";
            $new_teacher->school_info_id = $school_id;
            $new_teacher->save();

            $new_user = new User;
            $new_user->name = $new_teacher->teacher_name;
            $new_user->password = bcrypt($new_staff->empid);
            $new_user->user_type = "4";
            $new_user->login_text = $new_staff->empid;
            $new_user->school_id = $school_id;
            $new_user->profile_type = "App\Teacher";
            $new_user->profile_id = $new_teacher->id;
            $new_user->save();
            $new_staff->user_type = "App\Teacher";
            $new_staff->user_id = $new_teacher->id;
            $new_staff->save();
            
        }
        foreach (range(1,600) as $index) {
            try{
                    $student_info = new StudentInfo;
                    $student_info->roll_no = $faker->numberBetween($min = 3000, $max = 90000);
                    $student_info->class_id = $class_array[$faker->numberBetween($min = 0, $max = 6)];
                    $student_info->student_name = $faker->name;
                    $student_info->father_name = $faker->name;
                    $student_info->mother_name = $faker->name;

                    $student_info->father_contact_no1 = $faker->phoneNumber;
                    $student_info->student_email = $faker->unique()->email;
                    $student_info->father_email = $faker->unique()->email;
                    $student_info->dob = $faker->date($format = 'Y-m-d', $max = 'now');
                    $student_info->gender = $gender_array[$faker->numberBetween($min = 0, $max = 1)];
                    $student_info->religion = $religion[$faker->numberBetween($min = 0, $max = 3)];
                    $student_info->caste = $caste[$faker->numberBetween($min = 0, $max = 3)];
                    $student_info->age = $faker->numberBetween($min = 5, $max = 25);
                    $student_info->student_address = $faker->city;
                    $student_info->place = $faker->city;
                    $student_info->block = $faker->city;
                    $student_info->district = $faker->city;
                    $student_info->state = $faker->city;
                    $student_info->landmark = $faker->city;
                    $student_info->pincode = $faker->numberBetween($min = 3000, $max = 9000);
                    $student_info->student_photo = "uploads/images/ckHpVvLs0VN4mKIK3YQJcfw7A.png";
                    $student_info->school_info_id = $school_id;
                    $student_info->save();
                    
                    $student_user = new User;
                    $student_user->name = $student_info->student_name;
                    $student_user->password = bcrypt($student_info->roll_no);
                    $student_user->user_type = "2";
                    $student_user->profile_type = "App\StudentInfo";
                    $student_user->profile_id = $student_info->id;
                    $student_user->login_text = $student_info->roll_no;
                    $student_user->school_id = $school_id;
                    $student_user->save();

                    $parent_info = new ParentInfo;
                    $parent_info->name = $student_info->father_name;
                    $parent_info->mobile_no = $student_info->father_contact_no1;
                    $parent_info->student_info_id = $student_info->id;
                    $parent_info->save();
                    $student_info->parent_id = $parent_info->id;
                    $student_info->update();
                        
                    $father_login = new User;
                    $father_login->name = $student_info->father_name;
                    $father_login->password = bcrypt($student_info->father_contact_no1);
                    $father_login->user_type = "3";
                    $father_login->login_text = $student_info->father_contact_no1;
                    $father_login->school_id = $school_id;
                    $father_login->profile_type = "App\ParentInfo";
                    $father_login->profile_id = $parent_info->id;
                    $father_login->save();
                print($index);
                    
              }catch (\Exception $e) {
                print($e->getMessage());
            }
        }
        

        DB::commit();
        // $this->call(UserSeeder::class);
    }
}
