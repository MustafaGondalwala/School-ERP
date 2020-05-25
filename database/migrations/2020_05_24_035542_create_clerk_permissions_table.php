<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClerkPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clerk_permissions', function (Blueprint $table) {
            $table->id();
            $table->integer('staff_id')->unique();
            $table->integer('user_login_id')->unique();
            $table->boolean('set_fee_installments');
            $table->boolean('set_fee_due_date');
            $table->boolean('set_fee');
            $table->boolean('set_fee_class_wise');
            $table->boolean('pay_fees');
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
        Schema::dropIfExists('clerk_permissions');
    }
}
