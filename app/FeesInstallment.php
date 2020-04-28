<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FeesInstallment extends Model
{
  protected $fillable = [
      'total_installments',
  ];
}
