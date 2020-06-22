<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_documents', function (Blueprint $table) {
            $table->id();
            $table->integer('student_info_id');
            $table->string('student_aadhar_card')->nullable();
            $table->string('father_aadhar_card')->nullable();
            $table->string('father_bank_name')->nullable();
            $table->string('father_bank_number')->nullable();
            $table->string('student_bank_name')->nullable();
            $table->string('student_bank_number')->nullable();
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
        Schema::dropIfExists('student_documents');
    }
}
