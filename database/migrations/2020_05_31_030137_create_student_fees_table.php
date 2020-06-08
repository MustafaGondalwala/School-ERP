<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentFeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_fees', function (Blueprint $table) {
            $table->id();
            $table->integer('school_info_id');
            $table->integer('student_info_id');
            $table->integer('fee_installment_id');
            $table->integer('fee_type_id');
            $table->integer('classes_id');
            $table->integer('amount');
            $table->integer('waiver_amount')->default(0);
            $table->integer('total_amount')->default(0);
            $table->integer('system_year_id');
            $table->integer('total_pending')->default(0);
            $table->boolean('indivitual_set')->default(0);
            $table->integer('current_paid')->default(0);
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
        Schema::dropIfExists('student_fees');
    }
}
