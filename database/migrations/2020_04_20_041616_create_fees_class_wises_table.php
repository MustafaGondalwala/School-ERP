<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFeesClassWisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fees_class_wises', function (Blueprint $table) {
            $table->id();
            $table->integer('class_id')->unsigned();
            $table->string('installment');
            $table->string('year');
            $table->string('fees_type');
            $table->string('amount')->default(0);
            $table->string('discount_amount')->default(0);
            $table->string('after_discount')->default(0);
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
        Schema::dropIfExists('fees_class_wises');
    }
}
