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
            $table->integer('user_type')->comment("1=> Student 2=> Staff");
            $table->integer('user_id');
            $table->date("attendance_date");
            $table->integer("attendance_type")->comments("1=> Present 2=> Leave 3=> Absence 4 => Blank")->default(4);
            $table->integer('class_id')->nullable();
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
