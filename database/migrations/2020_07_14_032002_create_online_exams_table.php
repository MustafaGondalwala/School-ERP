<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOnlineExamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('online_exams', function (Blueprint $table) {
            $table->id();
            $table->integer('questionpaper_id');
            $table->integer('class_id');
            $table->integer('exam_type')->comment('1 => Monthly Test 2 => Exam');
            $table->integer('exam_type_id');
            $table->integer('school_id');
            $table->integer('year_id');
            $table->date('exam_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('remark')->nullable();
            $table->morphs('created_by');
            $table->integer('teacher_id');
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
        Schema::dropIfExists('online_exams');
    }
}
