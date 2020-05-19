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
            $table->integer("homework_id");
            $table->integer("student_id");
            $table->date('submition_date');
            $table->integer('status')->default(1)->comment("1=> Pending 2=> Completed 3=> Raise Issue");
            $table->integr("class_id");
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
