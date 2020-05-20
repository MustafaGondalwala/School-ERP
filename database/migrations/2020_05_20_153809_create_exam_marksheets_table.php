<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamMarksheetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exam_marksheets', function (Blueprint $table) {
            $table->id();
            $table->integer('exam_type')->comment("1=> Exam 2=> Month Test");
            $table->integer('exam_id');
            $table->integer('year_id');
            $table->integer('class_id');
            $table->integer('subject_id');
            $table->integer('max_marks');
            $table->integer('min_marks');
            $table->integer('grace_marks');
            $table->integer('marks');
            $table->integer('student_id');
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
        Schema::dropIfExists('exam_marksheets');
    }
}
