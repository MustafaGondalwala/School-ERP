<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFeeReceiptsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fee_receipts', function (Blueprint $table) {
            $table->id();
            $table->string('reciept');
            $table->integer('fee_id');
            $table->integer('student_id');
            $table->string('installment');
            $table->string('select_year');
            $table->integer('current_paid');
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
        Schema::dropIfExists('fee_receipts');
    }
}
