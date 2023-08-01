<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ad;

class AdController extends Controller
{
    public function index()
    {
        $ads = Ad::all();
        return inertia('/dashboard',[
            "ads" => $ads
        ]);
    }
}
