<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    // This allows us to use the create method in the ProductController
    protected $fillable = ['name', 'price', 'stock'];
}
