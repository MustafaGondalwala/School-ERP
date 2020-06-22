<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentRemarksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_remarks', function (Blueprint $table) {
            $table->id();
            $table->integer('student_info_id');
            $table->string('remark_1')->nullable();
            $table->string('remark_2')->nullable();
            $table->string('remark_3')->nullable();
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
        Schema::dropIfExists('student_remarks');
    }
}
