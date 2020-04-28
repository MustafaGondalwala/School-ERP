<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdmissionStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admission_students', function (Blueprint $table) {
            $table->id();
            $table->string('admission_id')->nullable();
            $table->string('class',50);
            $table->string('section',50);
            $table->string('student_name',50);
            $table->string('father_name',50);
            $table->string('father_contact_no',20);
            $table->date('dob');
            $table->string('gender',10);
            $table->string('student_address');
            $table->string('student_photo_img_path',200)->nullable();
            $table->string('religion',20);
            $table->string('caste',20);
            $table->integer('age');
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
        Schema::dropIfExists('admission_students');
    }
}
