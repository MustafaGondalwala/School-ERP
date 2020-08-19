<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamMarkSheetStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exam_mark_sheet_students', function (Blueprint $table) {
            $table->id();
            $table->integer('student_id');
            $table->integer('school_id');
            $table->integer('class_id');
            $table->integer('year_id');
            $table->integer('status')->comment("1=> Not Edit 2=> Editing 3=> Publish 4=> Unpublish")->default(1);
            $table->integer('total_marks')->nullable();
            $table->integer('exam_type');
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
        Schema::dropIfExists('exam_mark_sheet_students');
    }
}
