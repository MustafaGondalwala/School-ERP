<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamAdmitCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exam_admit_cards', function (Blueprint $table) {
            $table->id();
            $table->integer('subject_id')->unsiged();
            $table->integer('class_id')->unsiged();
            $table->time("start_time")->default("09:00");
            $table->time('end_time')->default("11:00");
            $table->string('year',20)->nullable();
            $table->date('exam_date')->nullable();
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
        Schema::dropIfExists('exam_admit_cards');
    }
}
