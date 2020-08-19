<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudyMaterialGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('study_material_groups', function (Blueprint $table) {
            $table->id();
            $table->integer('class_id');
            $table->integer('school_id');
            $table->integer('year_id');
            $table->morphs('teacher');
            $table->integer('subject_id');
            $table->string('group_name',100);
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
        Schema::dropIfExists('study_material_groups');
    }
}