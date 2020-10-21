<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_addresses', function (Blueprint $table) {
            $table->id();
            $table->integer('student_info_id');
            $table->string('student_address');
            $table->string('block',50)->nullable();
            $table->string('district',50)->nullable();
            $table->string('state',50)->nullable();
            $table->string('landmark',50)->nullable();
            $table->string('pincode',20);
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
        Schema::dropIfExists('student_addresses');
    }
}
