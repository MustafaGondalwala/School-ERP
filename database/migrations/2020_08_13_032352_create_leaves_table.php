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
            $table->integer('student_id');
            $table->date('date');
            $table->string('reason');
            $table->datetime('applied_date');
            $table->string('attachment')->nullable();
            $table->integer('status')->default(1)->comment('1=> Pending 2=> Accepted 3=> Rejected');
            $table->integer('school_id');
            $table->integer('year_id');
            $table->integer('class_id');
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
