<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHomeWorksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('home_works', function (Blueprint $table) {
            $table->id();
            $table->integer("teacher_id");
            $table->integer("class_id");
            $table->string('title',50);
            $table->string('subtitle',70);
            $table->text('description');
            $table->integer('file_id')->nullable();
            $table->date('submition_date');
            $table->integer("subject_id")->nullable();
            $table->integer('homework_id')->comment("1=> HomeWork 2=> Assignment 3=> Project")->default(1);
            $table->integer("created_by")->default(1)->comment("1=> Teacher 2=> Admin");
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
        Schema::dropIfExists('home_works');
    }
}
