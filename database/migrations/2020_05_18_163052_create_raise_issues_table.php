<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRaiseIssuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('raise_issues', function (Blueprint $table) {
            $table->id();
            $table->integer('homework_id');
            $table->integer('teacher_id');
            $table->integer('class_id');
            $table->integer('parent_id');
            $table->integer('student_id');
            $table->string('title');
            $table->text('description');
            $table->integer('created_by')->comment('1=> Parent 2=> Student');
            $table->integer('status')->comment("1=> Open 2=> Solved");
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
        Schema::dropIfExists('raise_issues');
    }
}
