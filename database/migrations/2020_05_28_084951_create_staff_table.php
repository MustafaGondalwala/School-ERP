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
            $table->date('date_of_joining');
            $table->string('pan_card_number')->nullable();
            $table->string('contact_no',150)->unique();
            $table->string('blood_group',10)->nullable();
            $table->string('staff_photo',100)->nullable();
            $table->string('id_proof',100)->nullable();
            $table->string('other_document1',100)->nullable();
            $table->string('other_document2',100)->nullable();
            $table->integer('salary');
            $table->string('aadhar_card',50)->nullable();
            $table->string('bank_name',50)->nullable();
            $table->string('bank_number',50)->nullable();
            $table->string('pf_no',50)->nullable();
            $table->string('salary_remark')->nullable();
            $table->integer('pf_amount')->default(0);
            $table->integer('tds_amount')->default(0);
            $table->integer('professional_tax')->default(0);
            $table->integer('da_amount')->default(0);
            $table->integer('hra_amount')->default(0);
            $table->integer('casual_leave')->default(0);
            $table->integer('pay_earn_leave')->default(0);
            $table->integer('sick_leave')->default(0);
            $table->integer('other_leave')->default(0);
            $table->integer('designation')->comment("1=> Teacher 2=> Clerk");
            $table->integer('school_id');
            $table->integer('year_id');
            $table->string('emp_photo',100)->nullable();
            $table->string('experience_letter',100)->nullable();
            $table->string('other_documents1',100)->nullable();
            $table->string('other_documents2',100)->nullable();
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
