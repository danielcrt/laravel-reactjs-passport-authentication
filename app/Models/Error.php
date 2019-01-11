<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Error extends Model
{
    protected $fillable = [
        'message', 'code'
    ];
}
