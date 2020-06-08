<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentTimeTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_time_tables', function (Blueprint $table) {
            $table->id();
            $table->string('time_table_name');
            $table->string('class_period_id');
            $table->integer('school_id');
            $table->integer('monday_subject_name')->nullable()->default(-1);
            $table->string('monday_teacher_name')->nullable()->default(-1);
            $table->integer('tuesday_subject_name')->nullable()->default(-1);
            $table->string('tuesday_teacher_name')->nullable()->default(-1);
            $table->integer('wednesday_subject_name')->nullable()->default(-1);
            $table->string('wednesday_teacher_name')->nullable()->default(-1);
            $table->integer('thursday_subject_name')->nullable()->default(-1);
            $table->string('thursday_teacher_name')->nullable()->default(-1);
            $table->integer('friday_subject_name')->nullable()->default(-1);
            $table->string('friday_teacher_name')->nullable()->default(-1);
            $table->integer('saturday_subject_name')->nullable()->default(-1);
            $table->string('saturday_teacher_name')->nullable()->default(-1);

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
        Schema::dropIfExists('student_time_tables');
    }
}
