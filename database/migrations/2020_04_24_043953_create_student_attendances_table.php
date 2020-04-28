<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentAttendancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_attendances', function (Blueprint $table) {
            $table->id();
            $table->integer("student_roll_no")->unsigned();
            $table->string("student_name",50);
            $table->string("student_father_name",50);
            $table->string("class_name",50);
            $table->string("section_name",50)->nullable();
            $table->date("attendance_date");
            $table->integer("attendance_type")->comments("1=> Present 2=> Leave 3=> Absence 4 => Blank")->default(4);
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
        Schema::dropIfExists('student_attendances');
    }
}
