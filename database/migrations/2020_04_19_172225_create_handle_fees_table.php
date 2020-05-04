<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHandleFeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('handle_fees', function (Blueprint $table) {
            $table->id();
            $table->integer('student_id')->unsigned();
            $table->string('installment',50);
            $table->string('fees_type',50);
            $table->integer('amount')->unsigned()->default(0);
            $table->integer('discount_amount')->unsigned()->default(0);
            $table->integer('after_discount')->unsigned()->default(0);
            $table->integer('total_pending')->unsigned()->default(0);
            $table->integer('current_paid')->unsigned()->default(0);
            $table->string('year',10);
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
        Schema::dropIfExists('handle_fees');
    }
}
