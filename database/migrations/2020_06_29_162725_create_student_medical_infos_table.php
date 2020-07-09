<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentMedicalInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_medical_infos', function (Blueprint $table) {
            $table->id();
            $table->date('checkup_date');
            $table->string('doctor_name',100);
            $table->string('report',100)->nullable();
            $table->float('student_height');
            $table->float('student_weight');
            $table->string('blood_group',5)->nullable();
            $table->float('blood_pressure')->nullable();
            $table->float('hemoglobin_level')->nullable();
            $table->float('diabetes_level')->nullable();
            $table->boolean('hiv')->default(0);
            $table->boolean('tb_infection')->default(0);
            $table->text('description')->nullable();
            $table->string('remark')->nullable();
            $table->integer('heath_marks');

            $table->integer('checkup_type');
            $table->integer('school_id');
            $table->integer('student_id');
            $table->integer('year_id');

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
        Schema::dropIfExists('student_medical_infos');
    }
}
