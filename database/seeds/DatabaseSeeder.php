<?php


use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\StudentInfo;
use App\User;
use App\StaffInfo;
use App\Teacher;
use Faker\Factory as Faker;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {   


        $password = "mustafas1";
        $gender_array = array('male','female','other');
        $class_array = array('5th','7th','8th','9th','10th','11th','12th');
        $religion = array('hindu','muslim','sikh','jain');
        $caste = array('general','sc','st','obc','other');
        $faker = Faker::create();

        // Teacher Faker
        foreach (range(1,5) as $index) {
            try{
            $new_teacher = new Teacher;
            $new_teacher->empid = "E".$faker->numberBetween($min = 0, $max = 199);
            $new_teacher->teacher_name = $faker->name;
            $new_teacher->email = $faker->email;
            $new_teacher->gender = "female";
            $new_teacher->relative_name = $faker->name;
            $new_teacher->email = $faker->email;
            $new_teacher->contact_no = $faker->phoneNumber;
            $new_teacher->qualification = "b.com";
            $new_teacher->address = $faker->city;
            $new_teacher->dob = $faker->date($format = 'Y-m-d', $max = 'now');
            $new_teacher->teach_subject = "1,2,3";
            $new_teacher->teach_class = "1,2,3";
            $new_teacher->date_of_join = $faker->date($format = 'Y-m-d', $max = 'now');
            $new_teacher->salary = $faker->numberBetween($min = 0, $max = 50000);
            $new_teacher->save();



              $new_staff = new StaffInfo;
              $new_staff->empid = $new_teacher->empid;
              $new_staff->name = $new_teacher->teacher_name;
              $new_staff->gender = $new_teacher->gender;
              $new_staff->relative_name = $new_teacher->relative_name;
              $new_staff->email = $new_teacher->email;
              $new_staff->contact_no = $new_teacher->contact_no;
              $new_staff->qualification = $new_teacher->qualification;
              $new_staff->address = $new_teacher->address;
              $new_staff->dob = $new_teacher->dob;
              $new_staff->salary = $new_teacher->salary;
              $new_staff->designation = "teacher";
              $new_staff->save();

                $login_teacher = new User;
                $login_teacher->name = $new_teacher->teacher_name;
                $login_teacher->empid = $new_teacher->empid;
                $login_teacher->user_type = "teacher";
                $login_teacher->password = bcrypt($new_teacher->empid);
                $login_teacher->login_text = $new_teacher->empid;
                $login_teacher->save();
            }catch(\Exception $e){
                continue;
            }
        }


        //   foreach (range(1,100) as $index) {
        //     try{
        //             $student_info = new StudentInfo;
        //             $student_info->roll_no = $faker->numberBetween($min = 3000, $max = 90000);
        //             $student_info->class = $class_array[$faker->numberBetween($min = 0, $max = 6)];
        //             $student_info->student_name = $faker->name;
        //             $student_info->father_name = $faker->name;
        //             $student_info->mother_name = $faker->name;

        //             $student_info->father_contact_no1 = $faker->phoneNumber;
        //             $student_info->student_email = $faker->unique()->email;
        //             $student_info->father_email = $faker->unique()->email;
        //             $student_info->dob = $faker->date($format = 'Y-m-d', $max = 'now');
        //             $student_info->gender = $gender_array[$faker->numberBetween($min = 0, $max = 1)];
        //             $student_info->religion = $religion[$faker->numberBetween($min = 0, $max = 3)];
        //             $student_info->caste = $caste[$faker->numberBetween($min = 0, $max = 3)];
        //             $student_info->age = $faker->numberBetween($min = 5, $max = 25);
        //             $student_info->student_address = $faker->city;
        //             $student_info->place = $faker->city;
        //             $student_info->block = $faker->city;
        //             $student_info->district = $faker->city;
        //             $student_info->state = $faker->city;
        //             $student_info->landmark = $faker->city;
        //             $student_info->pincode = $faker->numberBetween($min = 3000, $max = 9000);
        //             $student_info->student_photo_img_path = "uploads/images/ckHpVvLs0VN4mKIK3YQJcfw7A.png";
        //             $student_info->save();
        //             $student_user = new User;
        //             $student_user->name = $student_info->student_name;
        //             $student_user->email = $student_info->student_email;
        //             $student_user->password = bcrypt($student_info->roll_no);
        //             $student_user->user_type = "student";
        //             $student_user->login_text = $student_info->roll_no;
        //             $student_user->save();
        //             $student_info->user_login_id = $student_user->id;

        //             $father_login = new User;
        //             $father_login->name = $student_info->father_name;
        //             $father_login->email = $student_info->father_email;
        //             $father_login->password = bcrypt($password);
        //             $father_login->user_type = "parent";
        //             $father_login->login_text = $student_info->father_name;
        //             $father_login->save();
        //             $student_info->father_login_id = $father_login->id;
        //             $student_info->save();
        //       }catch (\Exception $e) {
        //         print($e->getMessage());
        //     }
        // }
        // $this->call(UsersTableSeeder::class);
    }
}
