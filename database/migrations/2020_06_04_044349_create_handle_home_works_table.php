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
            $table->integer('status')->comment('1 => Pending 2=>Completed 3=> Raise Issue 4=> Submitted 5 => Rejected 6=> Closed')->default(1);
            $table->text('description')->nullable();
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
