<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentPhotosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_photos', function (Blueprint $table) {
            $table->id();
            $table->integer('student_info_id');
            $table->string('student_photo',100)->nullable();
            $table->string('father_photo',100)->nullable();
            $table->string('mother_photo',100)->nullable();
            $table->string('last_marksheet',100)->nullable();
            $table->string('income_certificate',100)->nullable();
            $table->string('transfer_certificate',100)->nullable();
            $table->string('caste_certificate',100)->nullable();
            $table->string('dob_certificate',100)->nullable();
            $table->string('student_aadhar_card_photo',100)->nullable();
            $table->string('father_aadhar_card_photo',100)->nullable();
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
        Schema::dropIfExists('student_photos');
    }
}
