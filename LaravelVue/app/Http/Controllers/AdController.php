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
         
        $ad = new Ad();
        $ad->title = $request->input('title');
        $ad->description = $request->input('description');
        $ad->price = $request->input('price');
        $ad->location = $request->input('location');
        $ad->image = $request->input('image');
        $ad->user_id = auth()->user()->id; 
        $ad->save();

        return to_route('dashboard');
    }

}
