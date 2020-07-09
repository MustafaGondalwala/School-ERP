<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegisterStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('register_students', function (Blueprint $table) {
            $table->id();
            $table->string('register_no');
            $table->integer('class');
            $table->string('student_name');
            $table->string('father_name');
            $table->string('mother_name')->nullable();
            $table->string('father_contact_no1');
            $table->string('father_contact_no2')->nullable();
            $table->date('dob');
            $table->string('gender');
            $table->string('student_address');
            $table->date('doA')->nullable();
            $table->string('block')->nullable();
            $table->string('district')->nullable();
            $table->string('state')->nullable();
            $table->string('student_photo')->nullable();
            $table->string('mother_photo')->nullable();
            $table->string('father_photo')->nullable();
            $table->integer('year_id');
            $table->integer('school_id');
            $table->integer('created_at')->nullable();
            $table->integer('updated_at')->nullable();
            $table->unique(array('register_no','school_id','year_id'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('register_students');
    }
}
