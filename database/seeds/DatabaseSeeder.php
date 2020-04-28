<?php


use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\StudentInfo;
use App\User;

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
        $faker = Faker::create();
        $password = "mustafas1";
        $gender_array = array('male','female','other');
        $class_array = array('10th','11th','12th');
        $religion = array('hindu','muslim','sikh','jain');
        $caste = array('general','sc','st','obc','other');
          foreach (range(1,50000) as $index) {
            try{
            $student_info = new StudentInfo;
            $student_info->roll_no = $faker->numberBetween($min = 3000, $max = 90000);
            $student_info->class = $class_array[$faker->numberBetween($min = 0, $max = 2)];
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
            $student_info->student_photo_img_path = "uploads/images/ckHpVvLs0VN4mKIK3YQJcfw7A.png";
            // $student_info->save();
            $student_user = new User;
            $student_user->name = $student_info->student_name;
            $student_user->email = $student_info->student_email;
            $student_user->password = bcrypt($password);
            $student_user->user_type = "student";
            $student_user->save();
            $student_info->user_login_id = $student_user->id;

            $father_login = new User;
            $father_login->name = $student_info->father_name;
            $father_login->email = $student_info->father_email;
            $father_login->password = bcrypt($password);
            $father_login->user_type = "father";
            $father_login->save();
            $student_info->father_login_id = $father_login->id;
            $student_info->save();



          }catch (\Exception $e) {
    print($e->getMessage());
}

          }
        // $this->call(UsersTableSeeder::class);
    }
}
