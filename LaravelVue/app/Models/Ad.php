<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    protected $fillable = ['title', 'description', "price", "location", "image"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
