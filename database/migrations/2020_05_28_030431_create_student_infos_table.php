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
            $table->integer('class_id')->default("");
            $table->string('religion',20);
            $table->string('caste',20);
            $table->integer('parent_id')->default("");
            $table->string('student_name',70);
            $table->string('father_name',70);
            $table->string('last_name',70);
            $table->string('mother_name',70)->default("");
            $table->string('student_email')->default("");
            $table->string('father_email')->default("");
            $table->string('mother_email')->default("");

            $table->string('father_occupation')->default("");
            $table->string('mother_occupation')->default("");
            $table->string('guardian_name')->default("");
            $table->string('guardian_occupation')->default("");

            $table->string('father_qualification')->default("");
            $table->string('mother_qualification')->default("");

            $table->date('dob');
            $table->integer('age')->unsigned();
            $table->date('date_of_admission')->default("");
            $table->enum('gender',array('male','female','other'))->comment('1=> male, 2=> female,3=>other');
            $table->string('father_contact_no1');
            $table->string('father_contact_no2')->default("");
            $table->string('year_id')->default(1);
            $table->string('handicapped',50)->default('no');

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
