<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ad;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AdController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $ads = $user->ads()->get();

        return Inertia::render('Ads',[
            "ads" => $ads
        ]);
    }
    public function create()
    {
        return Inertia::render('Ads/Create');
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $user = Auth::user();

        $ad = new Ad([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        $user->ads()->save($ad);

        return redirect()->route('ads.index');
    }
}
