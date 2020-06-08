<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->morphs('user');
            $table->string('empid')->unique();
            $table->string('relative_name',100);
            $table->string('staff_name');
            $table->string('gender',10);
            $table->string('email',100)->unique();
            $table->string('address');
            $table->string('qualification')->nullable();
            $table->date('dob');
            $table->string('contact_no',20)->unique();
            $table->string('bloodgroup',10)->nullable();
            $table->string('staff_photo',100)->nullable();
            $table->string('experience_letter',100)->nullable();
            $table->string('id_proof',100)->nullable();
            $table->string('other_document1',100)->nullable();
            $table->string('other_document2',100)->nullable();
            $table->date('date_of_joining')->nullable();
            $table->string('pan_card_no',40)->nullable();
            $table->integer('salary');
            $table->string('aadhar_no',50)->nullable();
            $table->string('bank_name',50)->nullable();
            $table->string('bank_ifc_no',50)->nullable();
            $table->string('bank_account_no',50)->nullable();
            $table->string('pf_no',50)->nullable();
            $table->integer('pf_amount')->nullable();
            $table->integer('tds_amount')->nullable();
            $table->integer('professional_tax_amount_monthly')->nullable();
            $table->integer('da_amount_monthly')->nullable();
            $table->integer('hra_amount_monthly')->nullable();
            $table->string('remark')->nullable();
            $table->integer('casual_leave')->nullable();
            $table->integer('pay_earn_leave')->nullable();
            $table->integer('sick_leave')->nullable();
            $table->integer('other_leave')->nullable();
            $table->integer('designation')->comment("1=> Teacher 2=> Staff 3=> Clerk");
            $table->integer('school_info_id');
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
        Schema::dropIfExists('staff');
    }
}
