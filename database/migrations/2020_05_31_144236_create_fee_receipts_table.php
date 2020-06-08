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
            $table->string('amount_name');
            $table->integer('student_id');
            $table->integer('school_id');
            $table->integer('system_year_id');
            $table->integer('payment_type')->comment('1=> Cash 2=> Cheque 3=> Bank Transfer 4=> Net Banking');
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
