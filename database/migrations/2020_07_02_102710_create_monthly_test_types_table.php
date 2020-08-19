<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMonthlyTestTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('monthly_test_types', function (Blueprint $table) {
            $table->id();
            $table->integer('class_id');
            $table->string('monthly_test');
            $table->integer('max_marks');
            $table->integer('min_marks');
            $table->integer('test_type')->comment('1 => Oral 2=> Written');
            $table->integer('school_id');
            $table->integer('year_id');
            $table->datetime('publish_at')->nullable();
            $table->boolean('publish')->default(0);
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
        Schema::dropIfExists('monthly_test_types');
    }
}
