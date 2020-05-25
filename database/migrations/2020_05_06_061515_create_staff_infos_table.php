<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaffInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff_infos', function (Blueprint $table) {
            $table->id();
            $table->string('empid',50)->unique();
            $table->string('name',50);
            $table->string('gender',10);
            $table->string('relative_name',60);
            $table->string('email',60)->unique();
            $table->string('contact_no',50)->unique();
            $table->string('address',150);
            $table->string('qualification',50)->nullable();
            $table->string('blood_group',10)->nullable();
            $table->date('dob');

            $table->string('staff_photo_img_path',100)->nullable();
            $table->string('experience_letter_photo_img_path',100)->nullable();
            $table->string('id_proof_img_path',100)->nullable();
            $table->string('other_document1_photo_img_path',100)->nullable();
            $table->string('other_document2_photo_img_path',100)->nullable();


            $table->string('pf_no',50)->nullable();
            $table->string('pan_card_no',50)->nullable();
            $table->string('aadhar_no',50)->nullable();
            $table->string('bank_name',50)->nullable();
            $table->integer('bank_ifc_no')->nullable();
            $table->string('bank_account_no',50)->nullable();
            $table->string('remark',100)->nullable();

            $table->integer('da_amount')->unsigned()->nullable();
            $table->integer('hra_amount')->unsigned()->nullable();
            $table->integer('pf_amount')->unsigned()->nullable();
            $table->integer('salary')->unsigned();



            $table->integer('casual_leave')->unsigned()->nullable();
            $table->integer('sick_leave')->unsigned()->nullable();
            $table->integer('pay_earn_leave')->unsigned()->nullable();
            $table->integer('other_leave')->unsigned()->nullable();
            $table->string('designation');
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
        Schema::dropIfExists('staff_infos');
    }
}
