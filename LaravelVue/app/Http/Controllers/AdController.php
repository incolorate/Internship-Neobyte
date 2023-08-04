<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdController extends Controller
{
    public function create ()
    {
        return Inertia::render("Dashboard/Ads/Create");
    }
}
