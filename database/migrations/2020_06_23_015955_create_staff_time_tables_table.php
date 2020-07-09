<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaffTimeTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff_time_tables', function (Blueprint $table) {
            $table->id();
            $table->string('time_table_name');
            $table->string('class_period_id');
            $table->integer('school_id');
            $table->integer('monday_subject_name')->nullable()->default(-1);
            $table->string('monday_class_name')->nullable()->default(-1);
            $table->integer('tuesday_subject_name')->nullable()->default(-1);
            $table->string('tuesday_class_name')->nullable()->default(-1);
            $table->integer('wednesday_subject_name')->nullable()->default(-1);
            $table->string('wednesday_class_name')->nullable()->default(-1);
            $table->integer('thursday_subject_name')->nullable()->default(-1);
            $table->string('thursday_class_name')->nullable()->default(-1);
            $table->integer('friday_subject_name')->nullable()->default(-1);
            $table->string('friday_class_name')->nullable()->default(-1);
            $table->integer('saturday_subject_name')->nullable()->default(-1);
            $table->string('saturday_class_name')->nullable()->default(-1);
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
        Schema::dropIfExists('staff_time_tables');
    }
}
