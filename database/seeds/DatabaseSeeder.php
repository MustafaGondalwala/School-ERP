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
        $gender_array = array('male','female','other');
        $class_array = array('1','2','3','4','5','6','7');
        $class_array_name = array('5th','6th','7th','8th','9th','10th','12th');
        $religion = array('hindu','muslim','sikh','jain');
        $caste = array('general','sc','st','obc','other');


        foreach(range(1,500) as $index){
            try{
                
        $school_id = 1;
        $new_addmission = new StudentInfo;
        $new_addmission->school_info_id = $school_id;
        $new_addmission->roll_no =  $faker->numberBetween($min = 3000, $max = 90000);
        $new_addmission->class_id = $class_array[$faker->numberBetween($min = 0, $max = 6)];
        $new_addmission->religion = $religion[$faker->numberBetween($min = 0, $max = 3)];
        $new_addmission->caste = $caste[$faker->numberBetween($min = 0, $max = 3)];
        $new_addmission->student_name = $faker->name;
        $new_addmission->father_name = $faker->name;
        $new_addmission->mother_name = $faker->name;
        $new_addmission->father_contact_no1 = $faker->phoneNumber;
        $new_addmission->sms_number = $new_addmission->father_contact_no1;
        $new_addmission->father_contact_no2 = $faker->phoneNumber;

        $new_addmission->father_email = $faker->unique()->email;
        $new_addmission->student_email = $faker->unique()->email;
        $new_addmission->dob = $faker->date($format = 'Y-m-d', $max = 'now');
        $new_addmission->age = $faker->numberBetween($min = 5, $max = 25);
        $new_addmission->gender = $gender_array[$faker->numberBetween($min = 0, $max = 1)];
        $new_addmission->father_occupation = $faker->name;
        $new_addmission->mother_occupation =$faker->name;
        $new_addmission->guardian_name = $faker->name;
        $new_addmission->guardian_occupation = $faker->name;
        $new_addmission->dob = $faker->date($format = 'Y-m-d', $max = 'now');
        $new_addmission->year_id = 1;
        $new_addmission->save();

        $new_addmission->address()->updateOrCreate([
            'student_address'=> $faker->name,
            'place'=>$faker->city,
            'block'=>$faker->city,
            'district'=>$faker->city,
            'state'=>$faker->city,
            'landmark'=>$faker->city,
            'pincode'=>$faker->city,
            'student_info_id'=>$new_addmission->id
        ]);
        $new_addmission->documents()->updateOrCreate([
            'student_aadhar_card'=>$faker->phoneNumber,
            'father_aadhar_card'=>$faker->phoneNumber,
            'father_bank_name'=>$faker->phoneNumber,
            'father_bank_number'=>$faker->phoneNumber,
            'student_bank_name'=>$faker->phoneNumber,
            'student_bank_number'=>$faker->phoneNumber,
            'student_info_id'=>$new_addmission->id
        ]);
        
        $student_photo = "http://res.cloudinary.com/dfpzk3jgf/image/upload/v1592634125/jenokskz4khsrohifaud.jpg";
        $father_photo = "http://res.cloudinary.com/dfpzk3jgf/image/upload/v1592634128/hjoa0qdavjvea8zfy6ju.jpg";
        $mother_photo = "http://res.cloudinary.com/dfpzk3jgf/image/upload/v1592634128/hjoa0qdavjvea8zfy6ju.jpg";
        $last_marksheet = "http://res.cloudinary.com/dfpzk3jgf/image/upload/v1592634128/hjoa0qdavjvea8zfy6ju.jpg";
        $income_certificate = "http://res.cloudinary.com/dfpzk3jgf/image/upload/v1592634128/hjoa0qdavjvea8zfy6ju.jpg";
        $transfer_certificate = "http://res.cloudinary.com/dfpzk3jgf/image/upload/v1592634128/hjoa0qdavjvea8zfy6ju.jpg";
        $caste_certificate = "http://res.cloudinary.com/dfpzk3jgf/image/upload/v1592634128/hjoa0qdavjvea8zfy6ju.jpg";
        $transfer_certificate = "http://res.cloudinary.com/dfpzk3jgf/image/upload/v1592634128/hjoa0qdavjvea8zfy6ju.jpg";
        $dob_certificate = "http://res.cloudinary.com/dfpzk3jgf/image/upload/v1592634128/hjoa0qdavjvea8zfy6ju.jpg";
        $student_aadhar_card_photo = "http://res.cloudinary.com/dfpzk3jgf/image/upload/v1592634128/hjoa0qdavjvea8zfy6ju.jpg";
        $father_aadhar_card_photo = "http://res.cloudinary.com/dfpzk3jgf/image/upload/v1592634128/hjoa0qdavjvea8zfy6ju.jpg";

        // if($request->hasFile('student_photo'))
        //     $student_photo = $this->uploadFile($request->student_photo)['url'];
        // if($request->hasFile('father_photo'))
        //     $father_photo = $this->uploadFile($request->father_photo)['url'];
        // if($request->hasFile('mother_photo'))
        //     $mother_photo = $this->uploadFile($request->mother_photo)['url'];
        // if($request->hasFile('income_certificate'))
        //     $income_certificate = $this->uploadFile($request->income_certificate)['url'];
        // if($request->hasFile('transfer_certificate'))
        //     $transfer_certificate = $this->uploadFile($request->transfer_certificate)['url'];
        // if($request->hasFile('caste_certificate'))
        //     $caste_certificate = $this->uploadFile($request->caste_certificate)['url'];
        // if($request->hasFile('dob_certificate'))
        //     $dob_certificate = $this->uploadFile($request->dob_certificate)['url'];
        // if($request->hasFile('student_aadhar_card_photo'))
        //     $student_aadhar_card_photo = $this->uploadFile($request->student_aadhar_card_photo)['url'];
        // if($request->hasFile('father_aadhar_card_photo'))
        //     $father_aadhar_card_photo = $this->uploadFile($request->father_aadhar_card_photo)['url'];

        $new_addmission->photos()->updateOrCreate([
            'student_photo'=>$student_photo,
            'father_photo'=>$father_photo,
            'mother_photo'=>$mother_photo,
            'last_marksheet'=>$last_marksheet,
            'income_certificate'=>$income_certificate,
            'transfer_certificate'=>$transfer_certificate,
            'caste_certificate'=>$caste_certificate,
            'transfer_certificate'=>$transfer_certificate,
            'dob_certificate'=>$dob_certificate,
            'student_aadhar_card_photo'=>$student_aadhar_card_photo,
            'father_aadhar_card_photo'=>$father_aadhar_card_photo,
            'student_info_id'=>$new_addmission->id
        ]);


        $new_student = new User;
        $new_student->name = $new_addmission->student_name;
        $new_student->login_text = $new_addmission->father_contact_no1;
        $new_student->school_id = $school_id;
        $new_student->year_id = 1;
        $new_student->profile_pic = $father_photo;
        $new_student->password = bcrypt($new_addmission->father_contact_no1);
        $new_student->user_type = 3;
        $new_student->save();

        $new_parent = new User;
        $new_parent->name = $new_addmission->student_name;
        $new_parent->login_text = $new_addmission->roll_no;
        $new_parent->school_id = $school_id;
        $new_parent->year_id = 1;
        $new_parent->profile_pic = $student_photo;
        $new_parent->password = bcrypt($new_addmission->roll_no);
        $new_parent->user_type = 2;
        $new_parent->save();
        
            }catch(\Exception $e){
                echo $e->getMessage();
            }
        }
        return 
        // foreach(range(1,500) as $index){
        //     $new_register = new RegisterStudent;
        //     $new_register->register_no = $faker->numberBetween($min = 3000, $max = 90000);
        //     $new_register->class = $class_array_name[$faker->numberBetween($min = 0, $max = 6)];
        //     $new_register->student_name =   $faker->name;
        //     $new_register->father_name =  $faker->name;
        //     $new_register->mother_name =  $faker->name;
        //     $new_register->father_contact_no1 =  $faker->phoneNumber;
        //     $new_register->father_contact_no2 =  $faker->phoneNumber;
        //     $new_register->dob = $faker->date($format = 'Y-m-d', $max = 'now');
        //     $new_register->student_address = $faker->city;
        //     $new_register->gender = "male";
        //     $new_register->doA = $faker->date($format = 'Y-m-d', $max = 'now');
        //     $new_register->block = $faker->city;
        //     $new_register->state = $faker->city;
        //     $new_register->district =  $faker->city;
        //     $new_register->year_id = 1;
        //     $new_register->save();
        // }
        // return;
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
                    "login_text"=>"admin",
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
                array("year"=>"2019-20"),
                array("year"=>"2018-19"),
                array("year"=>"2017-18"),
                array("year"=>"2016-17"),
                array("year"=>"2015-16"),
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
        $new_staff = new Staff;
        $new_staff->empid = "teacher";
        $new_staff->relative_name = "teacher";
        $new_staff->staff_name = "teacher";
        $new_staff->gender = "male";
        $new_staff->email = "teacher@gmail.com";
        $new_staff->address = "hyderabad";
        $new_staff->dob = "2020-03-04";
        $new_staff->contact_no = "9586756273";
        $new_staff->salary = "0";
        $new_staff->designation = "1";
        $new_staff->school_info_id = $school_id;
                
        $new_teacher = new Teacher;
        $new_teacher->empid = "teacher";
        $new_teacher->teacher_name = "teacher";
        $new_teacher->teacher_subject = "1,2";
        $new_teacher->teacher_class = "1,2";
        $new_teacher->assign_class_id = "1";
        $new_teacher->school_info_id = $school_id;
        $new_teacher->save();
        
        $new_user = new User;
        $new_user->name = "teacher";
        $new_user->password = bcrypt("teacher");
        $new_user->user_type = "4";
        $new_user->login_text = "teacher";
        $new_user->school_id = $school_id;
        $new_user->profile_type = "App\Teacher";
        $new_user->profile_id = $new_teacher->id;
        $new_user->save();
        $new_staff->user_type = "App\Teacher";
        $new_staff->user_id = $new_teacher->id;
        $new_staff->save();



        $student_info = new StudentInfo;
        $student_info->roll_no = $faker->numberBetween($min = 3000, $max = 90000);
        $student_info->class_id = 1;
        $student_info->student_name = "student";
        $student_info->father_name = "parent";
        $student_info->mother_name = "parent";

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
       $student_user->name = "student";
       $student_user->password = bcrypt("student");
       $student_user->user_type = "2";
       $student_user->profile_type = "App\StudentInfo";
       $student_user->profile_id = $student_info->id;
       $student_user->login_text = "student";
       $student_user->school_id = $school_id;
       $student_user->save();

       $parent_info = new ParentInfo;
       $parent_info->name = $student_info->father_name;
       $parent_info->mobile_no = $student_info->father_contact_no1;
       $parent_info->student_info_id = "student";
       $parent_info->save();
       $student_info->parent_id = $parent_info->id;
       $student_info->update();
                        
       $father_login = new User;
       $father_login->name = "parent";
       $father_login->password = bcrypt("parent");
       $father_login->user_type = "3";
       $father_login->login_text = "parent";
       $father_login->school_id = $school_id;
       $father_login->profile_type = "App\ParentInfo";
       $father_login->profile_id = $parent_info->id;
       $father_login->save();

        foreach(range(1,6) as $index){
            try{
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
            }catch(\Exception $e){
                continue;
            }
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
