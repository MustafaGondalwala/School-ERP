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
            $table->integer('school_id');
            $table->integer('student_id');
            $table->integer('class_id');
            $table->integer('subject_id');
            $table->integer('min_marks')->nullable();
            $table->integer('max_marks')->nullable();
            $table->integer('total_marks')->nullable();
            $table->char('grade')->nullable();
            $table->morphs('user');
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
