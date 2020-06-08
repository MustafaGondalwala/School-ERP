<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFeeDueDatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fee_due_dates', function (Blueprint $table) {
            $table->id();
            $table->integer('fee_installment_id');
            $table->date('last_due_date')->nullable();
            $table->integer('school_info_id');
            $table->integer('system_year_id');
            $table->unique(['school_info_id', 'fee_installment_id']);
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
        Schema::dropIfExists('fee_due_dates');
    }
}
