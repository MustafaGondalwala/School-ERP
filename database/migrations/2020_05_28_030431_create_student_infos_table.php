<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_infos', function (Blueprint $table) {
            $table->id();
            $table->integer('school_id');
            $table->string('roll_no')->unique();
            $table->integer('class_id')->nullable();
            $table->string('religion',20);
            $table->string('caste',20);
            $table->integer('parent_id')->nullable();
            $table->string('student_name',70);
            $table->string('father_name',70);
            $table->string('mother_name',70)->nullable();
            $table->string('student_email')->nullable();
            $table->string('father_email')->nullable();
            $table->string('father_occupation')->nullable();
            $table->string('mother_occupation')->nullable();
            $table->string('guardian_name')->nullable();
            $table->string('guardian_occupation')->nullable();
            $table->date('dob');
            $table->integer('age')->unsigned();
            $table->date('date_of_admission')->nullable();
            $table->enum('gender',array('male','female','other'))->comment('1=> male, 2=> female,3=>other');
            $table->string('father_contact_no1');
            $table->string('father_contact_no2')->nullable();
            $table->string('year_id')->default(1);
            $table->string('handicapped',50)->default('no');
            $table->string('remark1')->nullable();
            $table->string('remark2')->nullable();
            $table->string('remark3')->nullable();

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
        Schema::dropIfExists('student_infos');
    }
}
