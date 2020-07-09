<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHandleReceiptsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('handle_receipts', function (Blueprint $table) {
            $table->id();
            $table->integer('receipt_id');
            $table->string('fee_installment');
            $table->integer('amount');
            $table->string('fee_type');
            $table->integer('waiver_amount');
            $table->integer('total_amount');
            $table->integer('total_pending');
            $table->integer('total_paid');
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
        Schema::dropIfExists('handle_receipts');
    }
}
