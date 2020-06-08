<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentHomeWorksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_home_works', function (Blueprint $table) {
            $table->id();
            $table->integer('school_id');
            $table->integer('class_id');
            $table->integer('teacher_id');
            $table->integer('homework_type')->comment("1=> HomeWork 2=> Assignment 3=> Project");
            $table->string('title',200);
            $table->string('subtitle',200);
            $table->date('submition_date');
            $table->binary('description');
            $table->integer('subject');
            $table->integer('status')->comment("1=> Open 2=> Closed")->default(1);
            $table->integer('file_id')->nullable();
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
        Schema::dropIfExists('student_home_works');
    }
}
