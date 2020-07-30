<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOnlineTestMarksheetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('online_test_marksheets', function (Blueprint $table) {
            $table->id();
            $table->integer('onlinetest_id');
            $table->integer('questionpaper_id');
            $table->integer('student_id');
            $table->integer('teacher_id');
            $table->integer('school_id');
            $table->integer('year_id');

            $table->integer('status')->comment('1 => Submitted 2=> Checked 3 => Published');
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
        Schema::dropIfExists('online_test_marksheets');
    }
}
