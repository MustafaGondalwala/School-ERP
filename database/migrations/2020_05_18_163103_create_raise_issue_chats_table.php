<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRaiseIssueChatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('raise_issue_chats', function (Blueprint $table) {
            $table->id();
            $table->integer('raise_issue_id');
            $table->integer('user_type')->comment("1=> Teacher 2=> Parent 3=> Student");
            $table->integer('user_id');
            $table->text('chat_text');
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
        Schema::dropIfExists('raise_issue_chats');
    }
}
