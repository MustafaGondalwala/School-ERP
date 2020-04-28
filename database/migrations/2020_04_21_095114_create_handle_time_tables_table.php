   <?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHandleTimeTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('handle_time_tables', function (Blueprint $table) {
            $table->id();
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->string('period_id',50)->nullable();
            
            $table->string('monday_subject_name')->nullable()->default("---");
            $table->string('monday_teacher_name')->nullable()->default("---");

            $table->string('tuesday_subject_name')->nullable()->default("---");
            $table->string('tuesday_teacher_name')->nullable()->default("---");

            $table->string('wednesday_subject_name')->nullable()->default("---");
            $table->string('wednesday_teacher_name')->nullable()->default("---");

            $table->string('thursday_subject_name')->nullable()->default("---");
            $table->string('thursday_teacher_name')->nullable()->default("---");

            $table->string('friday_subject_name')->nullable()->default("---");
            $table->string('friday_teacher_name')->nullable()->default("---");

            $table->string('saturday_subject_name')->nullable()->default("---");
            $table->string('saturday_teacher_name')->nullable()->default("---");


            $table->string('class',50)->nullable();
            $table->string('section')->nullable();
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
        Schema::dropIfExists('handle_time_tables');
    }
}
