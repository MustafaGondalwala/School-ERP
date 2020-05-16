<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLeavesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('leaves', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('user_type')->comment("1=> Student 2=> Teacher");
            $table->date('from');
            $table->date('to');
            $table->text('reason');
            $table->integer('accepted')->comment('0=> Rejected 1=> Accepted, 2=> Pending')->default(2);
            $table->integer('action_done_id')->nullable();
            $table->integer('action_done_user_type')->comment('1=> Teacher, 2=> Admin')->nullable();
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
        Schema::dropIfExists('leaves');
    }
}
