<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOnlineTestAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('online_test_answers', function (Blueprint $table) {
            $table->id();
            $table->integer('online_marksheet_id');
            $table->integer('question_id');
            $table->integer('questionpaper_id');
            $table->integer('final_marks')->nullable();
            $table->text('correct');
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
        Schema::dropIfExists('online_test_answers');
    }
}
