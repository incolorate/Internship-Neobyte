<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdCreateRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Ad;

class AdController extends Controller
{
    public function create ()
    {
        return Inertia::render("Dashboard/Ads/Create");
    }

    public function store(AdCreateRequest $request)
    {    
        $user = Auth::user();
        $ad =  Ad::create($request->all());
        $user->ads()->save($ad);
        
        return to_route('dashboard');
    }

}
