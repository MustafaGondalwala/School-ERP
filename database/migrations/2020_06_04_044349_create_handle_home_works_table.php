<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHandleHomeWorksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('handle_home_works', function (Blueprint $table) {
            $table->id();
            $table->integer('school_id');
            $table->integer('student_id');
            $table->integer('homework_id');
            $table->integer('status')->comment('1 => Pending 2=>Completed 3=> Raise Issue')->default(1);
            $table->integer('file_id')->nullable();
            $table->integer('raise_issue_id')->nullable();
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
        Schema::dropIfExists('handle_home_works');
    }
}
