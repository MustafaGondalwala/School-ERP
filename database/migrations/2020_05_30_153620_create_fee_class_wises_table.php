<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFeeClassWisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fee_class_wises', function (Blueprint $table) {
            $table->id();
            $table->integer('school_id');
            $table->integer('classes_id');
            $table->integer('fee_installment_id');
            $table->integer('fee_type_id');
            $table->integer('year_id');
            $table->integer('amount')->default(0);
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
        Schema::dropIfExists('fee_class_wises');
    }
}
