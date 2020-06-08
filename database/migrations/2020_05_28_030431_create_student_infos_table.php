<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_infos', function (Blueprint $table) {
            $table->id();
            $table->integer('school_info_id');
            $table->string('roll_no')->unique();
            $table->integer('class_id')->nullable();
            $table->string('religion',20);
            $table->string('caste',20);
            $table->integer('parent_id')->nullable();

            $table->string('student_name',70);
            $table->string('father_name',70);
            $table->string('mother_name',70)->nullable();
            $table->string('father_contact_no1');
            $table->string('father_contact_no2')->nullable();
            $table->string('father_email')->nullable();
            $table->string('student_email')->nullable();
            $table->date('dob');
            $table->integer('age')->unsigned();
            $table->date('date_of_admission')->nullable();
            $table->enum('gender',array('male','female','other'))->comment('1=> male, 2=> female,3=>other');
            $table->string('student_address');
            $table->string('place',50);
            $table->string('block',50)->nullable();
            $table->string('district',50)->nullable();
            $table->string('state',50)->nullable();
            $table->string('landmark',50)->nullable();
            $table->string('pincode',20);
            $table->string('student_photo',100)->nullable();
            $table->string('father_photo',100)->nullable();
            $table->string('mother_photo',100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('student_infos');
    }
}
