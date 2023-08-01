<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ad;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;



class AdController extends Controller
{

    public function allAds()
    {

        $ads = Ad::with("user")->paginate(9);

        return Inertia::render('Welcome',[
            "ads" => $ads
        ]);
    }
   
    public function index()
    {
        $user = Auth::user();
        $ads = $user->ads()->get();
        Inertia::share('rootAds', $ads);
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

    public function edit($id)
    {
        $user = Auth::user();
        $ad = $user->ads()->find($id);

        if (!$ad) {
            return redirect()->route('ads.index')->with('error', 'Ad not found');
        }
         
        return Inertia::render('Ads/Edit', [
            "ad" => $ad
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $user = Auth::user();
        $ad = $user->ads()->find($id);

        if (!$ad) {
            return redirect()->route('ads.index')->with('error', 'Ad not found');
        }

        $ad->title = $request->input('title');
        $ad->description = $request->input('description');
        $ad->save();

        return redirect()->route('ads.index')->with('success', 'Ad updated successfully');
    }

    public function destroy($id)
    {
        // Find the authenticated user
        $user = Auth::user();

        // Find the ad by its ID within the user's ads
        $ad = $user->ads()->find($id);

        // Check if the ad exists
        if (!$ad) {
            return redirect()->route('ads.index')->with('error', 'Ad not found');
        }

        // Delete the ad from the database
        $ad->delete();

        // Redirect back to the ads index page with a success message
        return redirect()->route('ads.index')->with('success', 'Ad deleted successfully');
    }
}
